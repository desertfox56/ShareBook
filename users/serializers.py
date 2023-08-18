from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions
import re

class UserRegistrSerializer(serializers.ModelSerializer):
    # Поле для повторения пароля
    password2 = serializers.CharField()
    
    # Настройка полей
    class Meta:
        # Поля модели которые будем использовать
        model = User
        # Назначаем поля которые будем использовать
        fields = ['email', 'password']
 
    # Метод для сохранения нового пользователя
    def save(self,role, *args, **kwargs):
        # Создаём объект класса User
        user = User.objects.create_user(
            email=self.validated_data['email'], # Назначаем Email
            
            password=self.validated_data['password']  # Назначаем пароль
        )
        # Проверяем на валидность пароль
        password = self.validated_data['password']
        
        
        # Сохраняем пользователя
        user.set_password(password)
        print(user.password)
        user.save()
        
        # Возвращаем нового пользователя 
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    username_field = get_user_model().USERNAME_FIELD

    def validate(self, attrs):
        
        credentials = {
            'email': '',
            'password': attrs.get('password')
        }
