from django.db import models
from django.conf import settings


NOTIFICATION_TYPES = [
    ('order_new', 'New Order'),
    ('order_status', 'Order Status Update'),
    ('review_new', 'New Review'),
    ('message_new', 'New Message'),
    ('verification', 'Verification Update'),
]


class Notification(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications'
    )
    type = models.CharField(max_length=30, choices=NOTIFICATION_TYPES)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    related_order = models.ForeignKey(
        'orders.Order', null=True, blank=True, on_delete=models.SET_NULL
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Notification({self.user.email} | {self.type})'
