from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField


class Design(models.Model):
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='designs'
    )
    prompt_text = models.TextField()
    style_tags = ArrayField(models.CharField(max_length=50), default=list, blank=True)
    generated_image_url = models.URLField(blank=True)
    color_palette = ArrayField(models.CharField(max_length=20), default=list, blank=True)
    name = models.CharField(max_length=255, blank=True)
    is_saved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Design({self.client.full_name} - {self.name or self.id})'
