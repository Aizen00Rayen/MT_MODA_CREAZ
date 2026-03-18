from django.db.models import Q
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import IsClient, IsTailor
from .models import Order, Message, OrderStep
from .serializers import (
    OrderListSerializer, OrderDetailSerializer, OrderCreateSerializer,
    OrderStatusUpdateSerializer, MessageSerializer, OrderStepSerializer,
)


class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrderCreateSerializer
        return OrderListSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            return Order.objects.filter(client=user).select_related('client', 'tailor')
        elif user.role == 'tailor':
            return Order.objects.filter(tailor=user).select_related('client', 'tailor')
        # admin sees all
        return Order.objects.all().select_related('client', 'tailor')

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsClient()]
        return [IsAuthenticated()]


class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderDetailSerializer

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(
            Q(client=user) | Q(tailor=user)
        ).prefetch_related('steps', 'messages__sender')


class OrderStatusUpdateView(APIView):
    permission_classes = [IsTailor]

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, tailor=request.user)
        except Order.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderStatusUpdateSerializer(data=request.data, context={'order': order})
        serializer.is_valid(raise_exception=True)

        new_status = serializer.validated_data['status']
        old_status = order.status
        order.status = new_status
        order.save(update_fields=['status', 'updated_at'])

        # Update corresponding step
        try:
            step = order.steps.filter(step_name=new_status).first()
            if step:
                from django.utils import timezone
                step.status = 'done'
                step.completed_at = timezone.now()
                step.save(update_fields=['status', 'completed_at'])
        except Exception:
            pass

        return Response(OrderListSerializer(order).data)


class OrderMessageListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_order(self):
        return Order.objects.get(
            Q(client=self.request.user) | Q(tailor=self.request.user),
            pk=self.kwargs['pk'],
        )

    def get_queryset(self):
        order = self.get_order()
        return order.messages.select_related('sender')

    def perform_create(self, serializer):
        order = self.get_order()
        serializer.save(order=order, sender=self.request.user)


class OrderStepListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderStepSerializer

    def get_queryset(self):
        user = self.request.user
        return OrderStep.objects.filter(
            order__pk=self.kwargs['pk']
        ).filter(
            Q(order__client=user) | Q(order__tailor=user)
        )


class InitiatePaymentView(APIView):
    permission_classes = [IsClient]

    def post(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, client=request.user)
        except Order.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Placeholder — CIB/Edahabia not yet API-accessible
        return Response({
            'status': 'pending',
            'message': 'Paiement en cours de traitement. Vous serez contacté(e) par SMS.',
            'order_id': str(order.id),
            'amount': str(order.price_agreed) if order.price_agreed else '0',
            'currency': 'DZD',
        })
