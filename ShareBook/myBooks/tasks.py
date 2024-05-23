from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import BookTransfer, UserBook
from .notifications import send_notification
import logging
logger = logging.getLogger(__name__)
@shared_task
def return_books():
    # Найти все передачи книг, которые должны быть возвращены
    transfers = BookTransfer.objects.filter(
        transferred_at__lte=timezone.now() - timedelta(days=7),
        status='transferred'
    )
    
    for transfer in transfers:
        # Проверка наличия записи книги у получателя перед удалением
        user_book_exists = UserBook.objects.filter(user=transfer.receiver_user, book=transfer.book).exists()
        if user_book_exists:
            user_book = UserBook.objects.get(user=transfer.receiver_user, book=transfer.book)
            user_book.delete()
        else:
            # Если запись отсутствует, логируем это
            logger.error(f"UserBook for {transfer.receiver_user.email} and book {transfer.book.title} does not exist. Cannot delete.")

        # Создание записи о книге у giver_user, если её нет
        if not UserBook.objects.filter(user=transfer.giver_user, book=transfer.book).exists():
            UserBook.objects.create(user=transfer.giver_user, book=transfer.book)
        
        # Обновление статуса и даты возврата в BookTransfer
        transfer.status = 'returned'
        transfer.returned_at = timezone.now()
        # Отправляем уведомление получателю
        send_notification(transfer.giver_user, f'Book {transfer.book} returned to you by {transfer.giver_user}', 'transfer')
        transfer.save()