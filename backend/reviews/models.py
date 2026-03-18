from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.conf import settings


class Review(models.Model):
    order = models.OneToOneField('orders.Order', on_delete=models.CASCADE, related_name='review')
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='given_reviews', on_delete=models.CASCADE
    )
    tailor = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='received_reviews', on_delete=models.CASCADE
    )
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Review({self.client.full_name} → {self.tailor.full_name} | {self.rating}★)'
