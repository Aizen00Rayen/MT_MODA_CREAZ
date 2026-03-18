import logging
from django.conf import settings

logger = logging.getLogger(__name__)


class NotificationService:
    @staticmethod
    def create(user, type, message, related_order=None):
        from .models import Notification
        return Notification.objects.create(
            user=user, type=type, message=message, related_order=related_order
        )

    @staticmethod
    def send_whatsapp(phone: str, message: str):
        if not phone:
            return
        if not settings.TWILIO_ACCOUNT_SID or not settings.TWILIO_AUTH_TOKEN:
            logger.info(f'WhatsApp skipped (no credentials): {phone} - {message}')
            return
        try:
            from twilio.rest import Client
            client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            client.messages.create(
                body=message,
                from_=settings.TWILIO_WHATSAPP_FROM,
                to=f'whatsapp:{phone}',
            )
        except Exception as e:
            logger.warning(f'WhatsApp send failed: {e}')
