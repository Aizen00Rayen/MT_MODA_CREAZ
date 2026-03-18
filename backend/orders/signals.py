import logging
from django.db.models.signals import post_save
from django.dispatch import receiver

logger = logging.getLogger(__name__)

ORDER_STEPS = ['confirmed', 'measuring', 'cutting', 'sewing', 'fitting', 'delivery', 'completed']

STATUS_LABELS = {
    'pending': 'En attente',
    'confirmed': 'Confirmée',
    'measuring': 'Prise de mesures',
    'cutting': 'Découpe',
    'sewing': 'Couture',
    'fitting': 'Essayage',
    'delivery': 'Livraison',
    'completed': 'Terminée',
    'cancelled': 'Annulée',
}


@receiver(post_save, sender='orders.Order')
def create_order_steps(sender, instance, created, **kwargs):
    if created:
        from .models import OrderStep
        for step_name in ORDER_STEPS:
            OrderStep.objects.create(order=instance, step_name=step_name)

        # Create notification for tailor
        try:
            from notifications.models import Notification
            Notification.objects.create(
                user=instance.tailor,
                type='order_new',
                message=f'Nouvelle commande de {instance.client.full_name}.',
                related_order=instance,
            )
        except Exception as e:
            logger.warning(f'Failed to create order notification: {e}')


@receiver(post_save, sender='orders.Order')
def notify_on_status_change(sender, instance, created, **kwargs):
    if created:
        return
    try:
        from notifications.models import Notification
        label = STATUS_LABELS.get(instance.status, instance.status)
        Notification.objects.create(
            user=instance.client,
            type='order_status',
            message=f'Votre commande est maintenant: {label}.',
            related_order=instance,
        )

        # WhatsApp notification
        if instance.client.phone:
            from notifications.services import NotificationService
            NotificationService.send_whatsapp(
                instance.client.phone,
                f'MT Moda Creaz: Votre commande #{str(instance.id)[:8]} est maintenant "{label}".'
            )
    except Exception as e:
        logger.warning(f'Failed to send status notification: {e}')
