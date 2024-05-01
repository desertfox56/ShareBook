from .views import RegistrUserView,CustomTokenObtainPairView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import *

urlpatterns = [
    path('register/', RegistrUserView.as_view(), name='register'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='api_logout'),
    path('user_profile/<int:pk>/', UserProfileView.as_view(), name='user_profile'),
    path('reset_password/',ResetPassword.as_view(), name='reset_password'),
    path('change_password/',ChangePassword.as_view(), name='change_password')
] 