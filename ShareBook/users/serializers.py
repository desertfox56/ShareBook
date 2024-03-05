from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions
import re
import logging
logger = logging.getLogger(__name__)
class UserRegistrSerializer(serializers.ModelSerializer):
    # Поле для повторения пароля
    #password2 = serializers.CharField()
    first_name = serializers.CharField(max_length=50, required=False)
    second_name = serializers.CharField(max_length=50, required=False)
    patronymic = serializers.CharField(max_length=50, required=False)
    # Настройка полей
    class Meta:
        # Поля модели которые будем использовать
        model = User
        # Назначаем поля которые будем использовать
        fields = ['email', 'password', 'first_name', 'second_name', 'patronymic']
 
    # Метод для сохранения нового пользователя
    def save(self,role=None, *args, **kwargs):
        # Создаём объект класса User
        user = User.objects.create_user(
            email=self.validated_data['email'], # Назначаем Email
            password=self.validated_data['password'],  # Назначаем пароль
            first_name=self.validated_data.get('first_name', ''),
            second_name=self.validated_data.get('second_name', ''),
            patronymic=self.validated_data.get('patronymic', ''),
        )
        # Проверяем на валидность пароль
        password = self.validated_data['password']
        
        
        # Сохраняем пользователя
        user.set_password(password)
        print(user.password)
        user.save()
        logger.info(f'User {user.email} saved with first_name {user.first_name}, second_name {user.second_name}, and patronymic {user.patronymic}.')
        # Возвращаем нового пользователя 
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    username_field = get_user_model().USERNAME_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Добавление id пользователя в payload
        token['id'] = user.id

        return token

    def validate(self, attrs):
        
        # Извлечение адреса электронной почты и пароля из attrs
        email = attrs.get('email')
        password = attrs.get('password')

        if not email:
            raise exceptions.ValidationError("Email is required for login.")

        credentials = {
            'email': email,
            'password': password
        }

         # IMPORTANT: Make sure to return the result of the parent class's validate method
        return super().validate(credentials)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'second_name', 'patronymic']