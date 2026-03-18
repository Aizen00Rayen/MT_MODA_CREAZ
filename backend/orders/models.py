import uuid
from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField


ORDER_STATUS = [
    ('pending', 'En attente'),
    ('confirmed', 'Confirmée'),
    ('measuring', 'Prise de mesures'),
    ('cutting', 'Découpe'),
    ('sewing', 'Couture'),
    ('fitting', 'Essayage'),
    ('delivery', 'Livraison'),
    ('completed', 'Terminée'),
    ('cancelled', 'Annulée'),
]

VALID_TRANSITIONS = {
    'pending': ['confirmed', 'cancelled'],
    'confirmed': ['measuring', 'cancelled'],
    'measuring': ['cutting'],
    'cutting': ['sewing'],
    'sewing': ['fitting'],
    'fitting': ['delivery'],
    'delivery': ['completed'],
    'completed': [],
    'cancelled': [],
}

PAYMENT_STATUS = [
    ('pending', 'En attente'),
    ('paid', 'Payé'),
    ('refunded', 'Remboursé'),
]


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='client_orders', on_delete=models.CASCADE
    )
    tailor = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='tailor_orders', on_delete=models.CASCADE
    )
    design = models.ForeignKey(
        'designs.Design', null=True, blank=True, on_delete=models.SET_NULL
    )
    description = models.TextField()
    style_tags = ArrayField(models.CharField(max_length=50), default=list, blank=True)
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')
    price_agreed = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    delivery_date_estimated = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Order({self.id} | {self.client.full_name} → {self.tailor.full_name})'

    def can_transition_to(self, new_status):
        return new_status in VALID_TRANSITIONS.get(self.status, [])


class OrderStep(models.Model):
    STEP_STATUS = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('done', 'Done'),
    ]
    order = models.ForeignKey(Order, related_name='steps', on_delete=models.CASCADE)
    step_name = models.CharField(max_length=50)
    status = models.CharField(max_length=10, choices=STEP_STATUS, default='pending')
    completed_at = models.DateTimeField(null=True, blank=True)
    note = models.TextField(blank=True)
    photos = ArrayField(models.URLField(), default=list, blank=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'Step({self.order_id} | {self.step_name} | {self.status})'


class Message(models.Model):
    order = models.ForeignKey(Order, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages'
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'Message({self.order_id} | {self.sender.full_name})'
