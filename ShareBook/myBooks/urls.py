from django.urls import path
from .views import *

urlpatterns = [
    path('purchase/<int:book_id>/', PurchaseView.as_view(), name='purchase'),
    path('transfer_book/', TransferBookView.as_view(), name='transfer_book'),
    path('personal-library/', PersonalLibraryView.as_view(), name='personal-library'),
    path('wishlist-library/', WishListLibraryView.as_view(), name='wishlist-library'),
    path('wishlist/<int:book_id>/', WishListView.as_view(), name='wishlist'),
]
