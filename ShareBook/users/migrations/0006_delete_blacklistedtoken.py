# Generated by Django 4.2.1 on 2024-04-26 14:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_totp_secret'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BlacklistedToken',
        ),
    ]
