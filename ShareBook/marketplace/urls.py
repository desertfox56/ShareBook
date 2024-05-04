from django.urls import path
from .views import *

urlpatterns = [
    path('book/<int:pk>/',BookView.as_view(), name='book'),
    path('allbooks/',BookViewAll.as_view(), name='books'),
    path('pagination/',BookPagination.as_view(), name='pagination'),
]
