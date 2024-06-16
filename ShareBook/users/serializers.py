from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import exceptions
from rest_framework.exceptions import *
from django.contrib.auth.password_validation import validate_password
from django_otp.oath import TOTP
import pyotp
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)

#Сериализатор для регистрации пользователя
class UserRegistrSerializer(serializers.ModelSerializer):
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

#Сериализатор для аутентификации пользователя
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

        return super().validate(credentials)
    
#Сериализатор для выхода из аккаунта пользователя
class LogOutSerilizer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, data):
        if not RefreshToken:
            raise ValidationError("Refresh Token нужен для выхода из аккаунта")
        return data

#Сериализатор для профиля пользователя
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'second_name', 'patronymic']

#Сериализатор для сброса и восстановления пароля пользователя с помощью TOTP
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise ValidationError("User with this email does not exist.")
 
        # Инициализируем здесь объект TOTP с секретом пользователя
        totp = pyotp.TOTP(user.totp_secret, interval=86400)
   
        if user.totp_secret and not totp.verify(data['otp']):
            raise ValidationError("OTP is invalid or has expired.")

        if not user.is_active:
            raise ValidationError("User account is not active.")

        return data

    def save(self):
        # Сохраняем новый пароль пользователя
        email = self.validated_data['email']
        new_password = self.validated_data['new_password']
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        # Очищаем секретный ключ TOTP после успешного сброса пароля
        user.totp_secret = None
        user.save()
        return user

#Сериализатор для смены пароля пользователя
class ChangePasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True)

    #Валидация нового пароля
    def validate_new_password(self, value):
        validate_password(value)
        return value
    
    #Валидация почты
    def validate_email(self, value):
        try:
            self.user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise ValidationError("User with this email does not exist.")
        
    def validate(self, data):
        user = self.user
        if not user.check_password(data['password']):
            # Проверяем текущий пароль пользователя
            raise serializers.ValidationError("Password does not match the current password.")
        if data['password'] == data['new_password']:
            # Новый пароль должен отличаться от текущего
            raise serializers.ValidationError("New password must be different from the current password.")
        return data
        
    def save(self):  
        user = self.user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user

#Сериализатор для контактной формы 
class ContactSerailizer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    subject = serializers.CharField()
    message = serializers.CharField()