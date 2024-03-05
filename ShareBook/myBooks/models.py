from django.db import models
from marketplace.models import Book
from users.models import User

class UserBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class BookTransfer(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    giver_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_transfers')
    receiver_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_transfers')
    transferred_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[("transferred", "Transferred"), ("returned", "Returned")])

    def __str__(self):
        return f"{self.book.title} transferred from {self.giver_user.username} to {self.receiver_user.username}"