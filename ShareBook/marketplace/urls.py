from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'Filter', BookFilterSet)
router.register(r'genres',GenreViewSet,basename='genre')
router.register(r'languages',LanguageViewSet,basename='languages')
router.register(r'authors',AuthorViewSet,basename='authors')

urlpatterns = [
    path('book/<int:pk>/',BookView.as_view(), name='book'),
    path('allbooks/',BookViewAll.as_view(), name='books'),
    path('pagination/',BookPagination.as_view(), name='pagination'),
    path('search/',BookSearchView.as_view(), name='search'),
    path('', include(router.urls)),
]
