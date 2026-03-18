import json
import logging

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.db import models as db_models

logger = logging.getLogger(__name__)


class OrderConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.order_id = self.scope['url_route']['kwargs']['order_id']
        self.room_group_name = f'order_{self.order_id}'
        user = self.scope.get('user')

        if not user or not user.is_authenticated:
            await self.close(code=4001)
            return

        if not await self.can_access_order(user, self.order_id):
            await self.close(code=4003)
            return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        logger.info(f'WS connected: user={user.id} order={self.order_id}')

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
        except json.JSONDecodeError:
            return

        msg_type = data.get('type')
        user = self.scope['user']

        if msg_type == 'message':
            content = data.get('content', '').strip()
            if not content:
                return
            msg = await self.save_message(content, user)
            msg_data = await self.serialize_message(msg)
            await self.channel_layer.group_send(
                self.room_group_name,
                {'type': 'chat_message', 'message': msg_data},
            )

        elif msg_type == 'status_update':
            if user.role == 'tailor':
                new_status = data.get('status')
                success, detail = await self.update_order_status(new_status, user)
                if success:
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {'type': 'status_update', 'status': new_status, 'detail': detail},
                    )
                else:
                    await self.send(text_data=json.dumps({'type': 'error', 'detail': detail}))

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    async def status_update(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def can_access_order(self, user, order_id):
        from .models import Order
        return Order.objects.filter(
            id=order_id
        ).filter(
            db_models.Q(client=user) | db_models.Q(tailor=user)
        ).exists()

    @database_sync_to_async
    def save_message(self, content, user):
        from .models import Message
        return Message.objects.create(
            order_id=self.order_id,
            sender=user,
            content=content,
        )

    @database_sync_to_async
    def serialize_message(self, msg):
        return {
            'id': msg.id,
            'content': msg.content,
            'sender_id': str(msg.sender_id),
            'sender_name': msg.sender.full_name,
            'created_at': msg.created_at.isoformat(),
            'is_read': msg.is_read,
        }

    @database_sync_to_async
    def update_order_status(self, new_status, user):
        from .models import Order
        try:
            order = Order.objects.get(id=self.order_id, tailor=user)
            if not order.can_transition_to(new_status):
                return False, f'Cannot transition from {order.status} to {new_status}.'
            order.status = new_status
            order.save(update_fields=['status', 'updated_at'])
            return True, f'Status updated to {new_status}.'
        except Order.DoesNotExist:
            return False, 'Order not found.'
        except Exception as e:
            return False, str(e)
