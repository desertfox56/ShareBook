from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0008_book_avatar'),      ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='price',
        ),
    ]