<<<<<<< HEAD
# utils/notifications.py
=======
>>>>>>> backup-branch
from .models import Notification

def send_notification(user, message, type):
    Notification.objects.create(recipient=user, message=message, type=type)