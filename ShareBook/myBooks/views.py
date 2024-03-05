from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from .models import *
from marketplace.models import Book
from .serializers import *
from users.models import *
from rest_framework import generics
class PurchaseView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        user = request.user if request.user.is_authenticated else None  # Получаем текущего пользователя

        # Создаем запись о покупке
        user_book = UserBook.objects.create(user=user, book=book)

        # Дополнительные действия, например, отправка уведомлений и т.д.

        return Response({'message': 'Purchase successful'}, status=status.HTTP_201_CREATED)

#Проверка существования пользователя, отрыв книги у первого пользователя, прикрепление ко второму пользователю   
class TransferBookView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        # Получаем данные из запроса
        giver_user_id = request.data.get('giver_user_id')
        receiver_user_id = request.data.get('receiver_user_id')
        book_id = request.data.get('book_id')

        # Получаем объекты или возвращаем 404, если не найдены
        giver_user = get_object_or_404(User, id=giver_user_id)
        receiver_user = get_object_or_404(User, id=receiver_user_id)
        book = get_object_or_404(Book, id=book_id)

        try:
            # Проверяем, есть ли у giver_user данная книга
            user_book = UserBook.objects.get(user=giver_user, book=book)
        except UserBook.DoesNotExist:
            return Response({'detail': f'Book not found for user {giver_user_id}'}, status=status.HTTP_404_NOT_FOUND)

        # Создаем запись в истории передачи книги
        transfer = BookTransfer.objects.create(book=book, giver_user=giver_user, receiver_user=receiver_user, status="transferred")

        # Удаляем запись о книге у giver_user
        user_book.delete()

        # Создаем запись о книге у receiver_user
        UserBook.objects.create(user=receiver_user, book=book)
       

        return Response({'message': 'Book transfer successful', 'giver_email': giver_user.email, 'receiver_email': receiver_user.email}, status=status.HTTP_201_CREATED)
#Представление, чтобы показать пользователю какие книги у него есть 
class PersonalLibraryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
   
    def get_queryset(self):
        # Возвращает все книги и передачи для текущего пользователя
        user = self.request.user
        user_books = UserBook.objects.filter(user=user)
        book_transfers = BookTransfer.objects.filter(giver_user=user) | BookTransfer.objects.filter(receiver_user=user)
        return (user_books, book_transfers)
    
    def list(self, request, *args, **kwargs):
        # Получение книг и передач
        user_books, book_transfers = self.get_queryset()

        # Сериализация данных
        user_books_serializer = UserBookSerializer(user_books, many=True)
        book_transfers_serializer = BookTransferSerializer(book_transfers, many=True)

        # Объединение данных в один ответ
        return Response({
            'user_books': user_books_serializer.data,
            'book_transfers': book_transfers_serializer.data
        })