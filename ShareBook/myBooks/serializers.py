from rest_framework import serializers
from marketplace.models import Book
from .models import *

class BookSerializer(serializers.ModelSerializer):
    genre_name = serializers.CharField(source='genre.name', read_only=True)
    language_name = serializers.CharField(source='language.name', read_only=True)
    author_name = serializers.SerializerMethodField()

    def get_author_name(self, obj):
        #return f"{obj.author.first_name} {obj.author.second_name} {obj.author.patronymic}"
         # Собираем части имени в список, пропуская None значения
        parts = [obj.author.first_name, obj.author.second_name, obj.author.patronymic]
        # Фильтруем список, убирая пустые или None значения
        filtered_parts = [part for part in parts if part]
        # Соединяем оставшиеся части имени в одну строку с пробелами
        return ' '.join(filtered_parts)

    class Meta:
        model = Book
        fields = '__all__'

class UserBookSerializer(serializers.ModelSerializer):
    book = BookSerializer() # Это вложит BookSerializer
    class Meta:
        model = UserBook
        fields = '__all__'
        
class BookTransferSerializer(serializers.ModelSerializer):
    class Meta:
        model=BookTransfer
        fields='__all__'

class WishBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    class Meta:
        model=WishBook
        fields='__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'type', 'read', 'created_at']
