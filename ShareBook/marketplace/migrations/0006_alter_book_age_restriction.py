# Generated by Django 4.2.1 on 2024-05-07 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0005_alter_book_age_restriction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='age_restriction',
            field=models.IntegerField(blank=True, choices=[(0, '0+'), (6, '6+'), (12, '12+'), (16, '16+'), (18, '18+')], null=True),
        ),
    ]