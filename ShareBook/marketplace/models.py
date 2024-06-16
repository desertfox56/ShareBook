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
    patronymic = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.second_name} {self.patronymic}"

class Book(models.Model):
    AGE_RESTRICTIONS = [
        (0, '0+'),
        (6, '6+'),
        (12, '12+'),
        (16, '16+'),
        (18, '18+'),
    ]

    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='books')
    file = models.URLField(max_length=500)
    count_pages = models.IntegerField()
    age_restriction = models.IntegerField(null=True, blank=True,choices=AGE_RESTRICTIONS)
    language = models.ForeignKey(Language,on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE,related_name='genre_books')
    author = models.ForeignKey(Author, on_delete=models.CASCADE,related_name='author_books')
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)

    def get_age_restriction_display_with_plus(self):
        value = dict(self.AGE_RESTRICTIONS).get(self.age_restriction)
        return value if value else self.age_restriction

class DelebleModel(Book):
    delete = models.BooleanField()