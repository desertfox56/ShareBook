from .models import User, UserToken
from django.db.models.signals import post_save, post_delete
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
<<<<<<< HEAD
        # Обновите UserToken только при обновлении RefreshToken
=======
        # Обновляем UserToken только при обновлении RefreshToken
>>>>>>> backup-branch
        user_token, _ = UserToken.objects.get_or_create(user=instance.user)
        user_token.token = str(instance.access_token)
        user_token.save()

@receiver(post_delete, sender=User)
def delete_account(sender, instance=None, **kwargs):
<<<<<<< HEAD
    # Логирование удаления пользователя или выполнение других действий
    print(f"Аккаунт пользователя {instance.email} был удален.")
    
    # Например, удаление связанного токена пользователя, если он не удаляется автоматически
=======
    # Логирование удаления пользователя
    print(f"Аккаунт пользователя {instance.email} был удален.")
    
    # Удаление связанного токена пользователя, если он не удаляется автоматически
>>>>>>> backup-branch
    UserToken.objects.filter(user=instance).delete()
  
