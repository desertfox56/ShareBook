# Generated by Django 4.2.1 on 2024-04-23 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_user_otp_user_otp_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='totp_secret',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
