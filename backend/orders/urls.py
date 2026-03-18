from django.urls import path
from .views import (
    OrderListCreateView, OrderDetailView, OrderStatusUpdateView,
    OrderMessageListView, OrderStepListView, InitiatePaymentView,
)

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='order-list'),
    path('<uuid:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('<uuid:pk>/status/', OrderStatusUpdateView.as_view(), name='order-status-update'),
    path('<uuid:pk>/messages/', OrderMessageListView.as_view(), name='order-messages'),
    path('<uuid:pk>/steps/', OrderStepListView.as_view(), name='order-steps'),
    path('<uuid:pk>/pay/', InitiatePaymentView.as_view(), name='order-pay'),
]
