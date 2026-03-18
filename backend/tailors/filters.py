from django_filters import FilterSet, CharFilter, NumberFilter, BooleanFilter
from .models import TailorProfile


class TailorFilter(FilterSet):
    wilaya = CharFilter(lookup_expr='iexact')
    specialty = CharFilter(method='filter_specialty')
    min_rating = NumberFilter(field_name='avg_rating', lookup_expr='gte')
    max_price = NumberFilter(field_name='price_base', lookup_expr='lte')
    min_price = NumberFilter(field_name='price_base', lookup_expr='gte')
    is_available = BooleanFilter()
    is_verified = BooleanFilter()
    city = CharFilter(lookup_expr='icontains')

    class Meta:
        model = TailorProfile
        fields = ['wilaya', 'is_available', 'is_verified']

    def filter_specialty(self, queryset, name, value):
        return queryset.filter(specialties__contains=[value])
