from django.test import TestCase
from django.urls import reverse
import base64
from django_otp.util import random_hex
from django.utils import timezone
from django_otp.oath import TOTP
import pyotp
#Дописать headers Авторизации
class OTPTests(TestCase):
    def test_otp_generation_and_validation(self):
        totp_secret = pyotp.random_base32()
        print(f'totp_secret: {totp_secret}')
        totp = pyotp.TOTP(totp_secret)
        print(f'totp:{totp}')
        token = totp.now()  
        print(f'token: {token}')
        veryfication=totp.verify(token)
        print(f'Верификация:{veryfication}')