import logging
from django.db.models import Avg
from django.db.models.signals import post_save
from django.dispatch import receiver

logger = logging.getLogger(__name__)


@receiver(post_save, sender='reviews.Review')
def update_tailor_rating(sender, instance, created, **kwargs):
    if created:
        try:
            from tailors.models import TailorProfile
            profile = instance.tailor.tailor_profile
            avg = instance.__class__.objects.filter(
                tailor=instance.tailor
            ).aggregate(avg=Avg('rating'))['avg']
            profile.avg_rating = round(avg, 2) if avg else 0
            profile.save(update_fields=['avg_rating'])
        except Exception as e:
            logger.warning(f'Failed to update tailor rating: {e}')
