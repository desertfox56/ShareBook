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
        #secret_key_hex = random_hex(10)
        #secret_key_base32 = base64.b32encode(bytes.fromhex(secret_key_hex)).decode('utf-8')
        #print(f'Hex Key Length: {len(secret_key_hex)}')
        #print(f'Base32 Key Length: {len(secret_key_base32)}')
        '''
        totp_secret = base64.b32encode(bytes.fromhex(random_hex(10))).decode('utf-8')
        print(f'totp_secret Length: {len(totp_secret)}')
        print(f'totp_secret:{totp_secret}')
        totp = TOTP(key=base64.b32decode(totp_secret.encode('utf-8')), step=30, digits=6)
        print(f'totp: {totp}')
        totp.time = timezone.now().timestamp()
        token = totp.token()
        print(f'token: {token}')
        totp1 = TOTP(key=base64.b32decode(totp_secret.encode('utf-8')), step=30, digits=6)
        totp.time = timezone.now().timestamp()  # Convert datetime to Unix timestamp
        print(f'верификация: {totp1}')
        '''
        totp_secret = pyotp.random_base32()
        print(f'totp_secret: {totp_secret}')
        totp = pyotp.TOTP(totp_secret)
        print(f'totp:{totp}')
        token = totp.now()  # TOTP token to be sent via email
        print(f'token: {token}')
        veryfication=totp.verify(token)
        print(f'Верификация:{veryfication}')