from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from rest_framework.permissions import IsAuthenticated
from .notifications import send_notification
from .models import *
from marketplace.models import Book
from .serializers import *
from users.models import *
from rest_framework import generics
#ПокупкаКниги
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
        #receiver_user_id = request.data.get('receiver_user_id')
        receiver_user_email = request.data.get('receiver_user_email')
        book_id = request.data.get('book_id')

        # Получаем объекты или возвращаем 404, если не найдены
        giver_user = get_object_or_404(User, id=giver_user_id)
        #receiver_user = get_object_or_404(User, id=receiver_user_id)
        receiver_user = get_object_or_404(User, email=receiver_user_email)
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

        # Отправляем уведомление получателю
        send_notification(receiver_user, f'Book {book.title} transferred to you by {giver_user.email}', 'transfer')   

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
    
#Добавление в список желаемого
class WishListView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request, book_id):
        book = get_object_or_404(Book, id=book_id)
        user = request.user if request.user.is_authenticated else None  # Получаем текущего пользователя
        if not user:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        # Попытка добавить книгу в список желаемого
        try:
            # Создаем запись о добавлении в список желаемого
            WishBook.objects.create(user=user, book=book)
            return Response({'message': 'Added to wishlist successfully'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            # Если такая запись уже существует, возвращаем ошибку
            return Response({'error': 'This book is already in your wishlist'}, status=status.HTTP_409_CONFLICT)

#Представление, чтобы показать пользователю какие книги у него в списке желаний
class WishListLibraryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
   
    def get_queryset(self):
        # Возвращает все книги списка желаний текущего пользователя
        user = self.request.user
        wish_books = WishBook.objects.filter(user=user).select_related('book')
        return (wish_books)
    
    def list(self, request, *args, **kwargs):
        # Получение книг 
        wish_books = self.get_queryset()
        # Сериализация данных
        wish_books_serializer = WishBookSerializer(wish_books, many=True)
        # Объединение данных в один ответ
        return Response({'wish_books':  wish_books_serializer.data })

#Сохранение уведомлений
class NotificationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user, read=False)

    def partial_update(self, request, pk=None):
        notification = self.get_object()
        notification.read = True
        notification.save()
        return Response(status=status.HTTP_204_NO_CONTENT)