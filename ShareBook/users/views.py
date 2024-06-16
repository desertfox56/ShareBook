from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .models import *
from .serializers import *
from django_otp.oath import TOTP
from django_otp.util import random_hex
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
import logging
import pyotp
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail

logger = logging.getLogger(__name__)

# Представление для регистрации
class RegistrUserView(CreateAPIView):
    # Добавляем в queryset
    queryset = User.objects.all()
    # Добавляем serializer UserRegistrSerializer
    serializer_class = UserRegistrSerializer
    # Добавляем права доступа
    permission_classes = [AllowAny]
    
    # Создаём метод для создания нового пользователя
    def post(self, request, *args, **kwargs):
        # Добавляем UserRegistrSerializer
        serializer = UserRegistrSerializer(data=request.data)
        # Создаём список data
        data = {}
        # Проверка данных на валидность
        if serializer.is_valid():
            # Сохраняем нового пользователя
            serializer.save()
            # Добавляем в список значение ответа True
            data['response'] = True
            # Возвращаем что всё в порядке
            return Response(data, status=status.HTTP_200_OK)
        else: # Иначе
            # Присваиваем data ошибку
            data = serializer.errors
            # Возвращаем ошибку
            return Response(data)

# Представление для аутентификации
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            logger.info(f"Successful login attempt for user: {request.data.get('email')}")
            return response
        except Exception as e:
            logger.error(f"Error during login attempt: {e}")
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# Представление для выхода из учетной записи
class LogoutView(APIView):
   permission_classes = [IsAuthenticated]
   serializer_class = LogOutSerilizer
   def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh_token")

        if not refresh_token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh_token = RefreshToken(refresh_token)
            refresh_token.blacklist()

            # Удаление записи токена из базы данных
            UserToken.objects.filter(token=str(refresh_token)).delete()


            return Response({"success": "Successfully logged out"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# Представление для отображения профиля пользователя
class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    
    def get_object(self):
        # Попытка получить пользователя по id, если пользователь не найден, будет возвращена ошибка 404
        return get_object_or_404(User, id=self.kwargs['pk'])

# Представление для сброса и восстановления пароля пользователем с помощью TOTP, когда пароль забыт
class ResetPassword(APIView):
    permission_classes = [AllowAny]

    #Сброс пароля
    def post(self,request):
        email = request.data.get('email')
        
        if not email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.filter(email=email).first()
        if user:

            # Генерируем секретный ключ для TOTP, если его нет
            if not user.totp_secret:
                user.totp_secret = pyotp.random_base32()
                user.save()
                
            # Инициализируем TOTP с секретным ключом пользователя
            totp = pyotp.TOTP(user.totp_secret, interval=86400) #interval - это время жизни TOTP в секундах, сейчас это 1 сутки
            token = totp.now()

            # Логируем время генерации TOTP
            logger.info(f'TOTP generated at: {timezone.now()} for user: {user.email}')

        # Отправляем email с TOTP
            send_mail(
        'Сбросьте свой пароль!',
        f'Используйте этот временный пароль, чтобы сбросить свой пароль {token}.',
        'from@example.com',
            [user.email],
            fail_silently=False,
        )
            return Response({'detail': 'TOTP has been sent to your email.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)
    
    # Восстановление пароля
    def put(self,request):
        # Сбрасываем пароль с использованием email, OTP и нового пароля
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
           
            # Проверяем наличие TOTP секрета у пользователя
            if not user.totp_secret:
                return Response({'detail': 'No TOTP secret found for user.'}, status=status.HTTP_400_BAD_REQUEST)
            totp = pyotp.TOTP(user.totp_secret, interval=86400)
            # Логируем время проверки TOTP
            logger.info(f'TOTP verification attempted at: {timezone.now()} for user: {user.email}')
            if totp.verify(serializer.validated_data['otp']):
                # Устанавливаем новый пароль и очищаем секретный ключ TOTP
                user.set_password(serializer.validated_data['new_password'])
                user.totp_secret = None  
                user.save()
                return Response({'detail': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid OTP or OTP has expired.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# Представление для смены пароля пользователя для страницы настроек
class ChangePassword(APIView):
     permission_classes = [IsAuthenticated]
     def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'detail': 'Password has been changed successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Представление обратной связи для контактной формы
class FeedBackView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ContactSerailizer

    def post(self, request, *args, **kwargs):
        serializer_class = ContactSerailizer(data=request.data)
        if serializer_class.is_valid():
            data = serializer_class.validated_data
            name = data.get('name')
            from_email = data.get('email')
            subject = data.get('subject')
            message = data.get('message')
            send_mail(f'От {name} | {subject}', message, from_email, ['aziev.farid@bk.ru'])
            return Response({"success": "Sent"})
        
#Представление для удаления аккаунта пользователя
class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        try:
            user.delete()
            logger.info(f"Successful deleting account for user: {request.data.get('email')}")
            return Response({'message': 'Your account has been deleted.'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)