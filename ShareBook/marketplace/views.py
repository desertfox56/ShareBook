from myBooks.serializers import BookSerializer
from .models import Book
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
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
    



