from django.db import models

class Language(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Author(models.Model):
    first_name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.second_name} {self.patronymic}"

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
    image = models.ImageField(upload_to='books')
    file = models.URLField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    count_pages = models.IntegerField()
    age_restriction = models.CharField(max_length=4,choices=AGE_RESTRICTIONS)
    language = models.ForeignKey(Language,on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE,related_name='genre_books')
    author = models.ForeignKey(Author, on_delete=models.CASCADE,related_name='author_books')

    

class DelebleModel(Book):
    delete = models.BooleanField()