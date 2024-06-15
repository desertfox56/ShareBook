from rest_framework import serializers
from .models import *


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']  

class LanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['id', 'name']  

class AuthorSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model=Author
        fields = ['id', 'full_name']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.second_name} {obj.patronymic if obj.patronymic else ''}".strip()
    
