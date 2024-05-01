from myBooks.serializers import BookSerializer
from .models import Book
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
#Представление для того, чтобы bookId загрузился в localStorage в React(делаем доступным вовне админки book_id)
class BookView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer

#Представление, чтобы показать все книги одним запросом
class BookViewAll(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    

    



