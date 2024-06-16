from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import User

# Создаем класс менеджера пользователей
class MyUserManager(BaseUserManager):
    # Создаем метод для создания пользователя
    def _create_user(self, email, password, **extra_fields):
        # Проверяем есть ли Email
        if not email: 
            # Выводим сообщение в консоль
            raise ValueError("Вы не ввели Email")
        # Проверяем есть ли логин
        
        # Делаем пользователя
        user = self.model(email=self.normalize_email(email), **extra_fields)
        # Сохраняем пароль
        user.set_password(password)
        # Сохраняем всё остальное
        user.save(using=self._db)
        # Возвращаем пользователя
        return user
    
    # Делаем метод для создание обычного пользователя
    def create_user(self, email, password,**extra_fields):
        # Возвращаем нового созданного пользователя
        return self._create_user(email, password,**extra_fields)
 
    # Делаем метод для создание админа сайта
    def create_superuser(self, email, password):
        # Возвращаем нового созданного админа
         return self._create_user(email, password, is_staff=True, is_superuser=True)

# Создаём класс User
class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True, unique=True) # Идентификатор
    email = models.EmailField(max_length=100, unique=True) # Email
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True) # Статус активации
    is_staff = models.BooleanField(default=False) # Статус админа
    otp = models.CharField(max_length=6, blank=True, null=True) #otp поле
    otp_created_at = models.DateTimeField(blank=True, null=True)
    totp_secret = models.CharField(
        max_length=100,  
        blank=True, null=True
    ) 
    USERNAME_FIELD = 'email' # Идентификатор для обращения 
    
 
    objects = MyUserManager() # Добавляем методы класса MyUserManager
    
    # Метод для отображения в админ панели
    def __str__(self):
        return self.email
    
class UserToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.TextField()
    

