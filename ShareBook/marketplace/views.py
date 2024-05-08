from myBooks.serializers import BookSerializer
from .serializers import *
from .models import Book
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import filters
from .filters import BookFilters 
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
import logging
logger = logging.getLogger(__name__)
#Представление для того, чтобы bookId загрузился в localStorage в React(делаем доступным вовне админки book_id)
class BookView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer

#Представление, чтобы показать все книги одним запросом
class BookViewAll(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all().distinct()
    serializer_class = BookSerializer

#Фильтр
class BookFilterSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Book.objects.all().order_by('id')
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookFilters

#ФильтрЖанры
class GenreViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

#ЯзыкиФильтр
class LanguageViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Language.objects.all()
    serializer_class = LanguagesSerializer

#АвторФильтр
class AuthorViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

#Поиск
class BookSearchView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all().order_by('id')
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['@title', '@author_name','id']
    def get_queryset(self):
        queryset = super().get_queryset()
        logger.debug(f"Initial queryset: {queryset.count()} items")
        return queryset


#Представление для пагинации книг.
class BookPagination(APIView):
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination
    
    def get(self, request, format=None):
        queryset = Book.objects.all().order_by('id')
        serializer = BookSerializer
        paginator = PageNumberPagination()
        paginator.page_size = 10  # Set the number of items per page
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = BookSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

#Представление для чтения пдф файла книг и преоброзования в текст.
#Скачать PyPDF2
'''
import PyPDF2

with open('your_pdf_file.pdf', 'rb') as file:
    pdf_reader = PyPDF2.PdfFileReader(file)
    # Extract text from each page
    for page_num in range(pdf_reader.numPages):
        page = pdf_reader.getPage(page_num)
        text = page.extractText()
        print(text)
'''
#Представление для пагинации текста книги(?)
    



