from django.db import models
from marketplace.models import Book
from users.models import User
from django.conf import settings

class UserBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
<<<<<<< HEAD
        unique_together = ('book', 'user')  # Adding a unique constraint
=======
        unique_together = ('book', 'user')  #unique constraint
>>>>>>> backup-branch

class BookTransfer(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    giver_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_transfers')
    receiver_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_transfers')
    transferred_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[("transferred", "Transferred"), ("returned", "Returned")])

    def __str__(self):
        return f"{self.book.title} transferred from {self.giver_user.email} to {self.receiver_user.email}"
    
class WishBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
<<<<<<< HEAD
        unique_together = ('book', 'user')  # Adding a unique constraint
=======
        unique_together = ('book', 'user')  #unique constraint
>>>>>>> backup-branch

class Notification(models.Model):
    TYPE_CHOICES = (
        ('transfer', 'Book Transfer'),
        ('available', 'Book Available'),
    )
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} notification for {self.recipient.email}"