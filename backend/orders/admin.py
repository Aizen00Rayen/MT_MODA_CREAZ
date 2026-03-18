from django.contrib import admin
from .models import Order, OrderStep, Message


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'client', 'tailor', 'status', 'price_agreed', 'payment_status', 'created_at']
    list_filter = ['status', 'payment_status', 'created_at']
    search_fields = ['client__email', 'tailor__email']
    readonly_fields = ['id', 'created_at', 'updated_at']


@admin.register(OrderStep)
class OrderStepAdmin(admin.ModelAdmin):
    list_display = ['order', 'step_name', 'status', 'completed_at']
    list_filter = ['status', 'step_name']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['order', 'sender', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
