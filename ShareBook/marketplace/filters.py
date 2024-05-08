from django_filters import rest_framework as filters
from .models import Book

class BookFilters(filters.FilterSet):
    price_gte = filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_lte = filters.NumberFilter(field_name='price', lookup_expr='lte')
    age_gte = filters.NumberFilter(field_name='age_restriction', lookup_expr='gte', method='filter_age_gte')
    age_lte = filters.NumberFilter(field_name='age_restriction', lookup_expr='lte', method='filter_age_lte')

    def filter_age_gte(self, queryset, name, value):
        print(f"Filtering {name} for greater than or equal to {value}")
        # Ensure 'value' is an integer or a valid input
        if isinstance(value, str) and value.isdigit():
            return queryset.filter(**{f"{name}__gte": int(value)})
        return queryset

    def filter_age_lte(self, queryset, name, value):
        print(f"Filtering {name} for less than or equal to {value}")
        # Ensure 'value' is an integer or a valid input
        if isinstance(value, str) and value.isdigit():
            return queryset.filter(**{f"{name}__lte": int(value)})
        return queryset

    class Meta:
        model = Book
        fields = {
            'title': ['exact', 'icontains'],
            'author': ['exact'],
            'genre': ['exact'],
            'language': ['exact'],
            'price': ['exact', 'gte', 'lte'],
            'age_restriction': ['exact', 'gte', 'lte'],
        }
