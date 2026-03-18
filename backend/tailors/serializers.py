from rest_framework import serializers
from .models import TailorProfile, PortfolioItem
from core.serializers import UserMinimalSerializer


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = ['id', 'image_url', 'caption', 'created_at']
        read_only_fields = ['id', 'created_at']


class TailorProfileListSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True)

    class Meta:
        model = TailorProfile
        fields = [
            'id', 'user', 'city', 'wilaya', 'specialties', 'avg_rating',
            'total_orders', 'is_verified', 'is_available', 'profile_photo',
            'price_base', 'experience_years',
        ]


class TailorProfileDetailSerializer(serializers.ModelSerializer):
    user = UserMinimalSerializer(read_only=True)
    portfolio = PortfolioItemSerializer(many=True, read_only=True)
    recent_reviews = serializers.SerializerMethodField()

    class Meta:
        model = TailorProfile
        fields = [
            'id', 'user', 'bio', 'city', 'wilaya', 'specialties',
            'experience_years', 'profile_photo', 'cover_photo',
            'avg_rating', 'total_orders', 'is_verified', 'is_available',
            'price_base', 'price_standard', 'price_premium',
            'portfolio', 'recent_reviews', 'created_at',
        ]

    def get_recent_reviews(self, obj):
        from reviews.models import Review
        from reviews.serializers import ReviewSerializer
        reviews = Review.objects.filter(tailor=obj.user).order_by('-created_at')[:5]
        return ReviewSerializer(reviews, many=True).data


class TailorProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TailorProfile
        fields = [
            'bio', 'city', 'wilaya', 'specialties', 'experience_years',
            'profile_photo', 'cover_photo', 'is_available',
            'price_base', 'price_standard', 'price_premium',
        ]
