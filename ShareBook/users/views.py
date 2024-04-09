from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import BlacklistedToken
from rest_framework import generics
import logging
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
logger = logging.getLogger(__name__)


# Создаём класс RegistrUserView
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

class LogoutView(APIView):
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
        

class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
   
    serializer_class = UserProfileSerializer
    
    
    def get_object(self):
        # Попытка получить пользователя по id, если пользователь не найден, будет возвращена ошибка 404
        return get_object_or_404(User, id=self.kwargs['pk'])
'''
class ResetPassword(APIView):
    def post(self,request):
        data = request.data
        email = data['email']
        user = User.objects.get(email=email)
        if User.objects.filter(email=email).exists():
        # send email with otp
            send_mail(
        'Subject here',
        f'Here is the message with {user.otp}.',
        'from@example.com',
            [user.email],
            fail_silently=False,
        )
            message = {
            'detail': 'Success Message'}
            return Response(message, status=status.HTTP_200_OK)
        else:
            message = {
            'detail': 'Some Error Message'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    def put(request):
    """reset_password with email, OTP and new password"""
    data = request.data
    user = CustomUser.objects.get(email=data['email'])
    if user.is_active:
        # Check if otp is valid
        if data['otp'] == user.opt:
            if new_password != '':
                # Change Password
                user.set_password(data['password'])
                user.save() # Here user otp will also be changed on save automatically 
                return Response('any response or you can add useful information with response as well. ')
            else:
                message = {
                    'detail': 'Password cant be empty'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = {
                'detail': 'OTP did not matched'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        message = {
            'detail': 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



'''