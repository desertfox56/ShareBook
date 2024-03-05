from .models import User, UserToken
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework_simplejwt.tokens import RefreshToken


@receiver(post_save, sender=User)
def create_user_token(sender, instance=None, created=False, **kwargs):
    if created:
        refresh = RefreshToken.for_user(instance)
        UserToken.objects.create(user=instance, token=str(refresh.access_token))

@receiver(post_save, sender=RefreshToken)
def update_user_token(sender, instance=None, created=False, **kwargs):
    if not created:
        # Обновите UserToken только при обновлении RefreshToken
        user_token, _ = UserToken.objects.get_or_create(user=instance.user)
        user_token.token = str(instance.access_token)
        user_token.save()
