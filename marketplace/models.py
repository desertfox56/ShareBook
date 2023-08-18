from django.db import models


class Language(models.Model):
    name = models.CharField(max_length=20)

class Genre(models.Model):
    name = models.CharField(max_length=20)

class Author(models.Model):
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50)

class Book(models.Model):
    AGE_RESTRICTIONS = [
        ('0+', '0+'),
        ('6+','6+'),
        ('12+', '12+'),
        ('16+', '16+'),
        ('18+', '18+'),
    ]

    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField()
    file = models.FileField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    count_pages = models.IntegerField(max_length=500)
    age_restriction = models.CharField(max_length=4,choices=AGE_RESTRICTIONS)
    language = models.ForeignKey(Language,on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    author = models.ForeignKey(Genre, on_delete=models.CASCADE)


class DelebleModel(Book):
    delete = models.BooleanField()