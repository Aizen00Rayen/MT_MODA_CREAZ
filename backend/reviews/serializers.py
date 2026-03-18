from rest_framework import serializers
from .models import Review
from core.serializers import UserMinimalSerializer


class ReviewSerializer(serializers.ModelSerializer):
    client = UserMinimalSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'client', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'client', 'created_at']


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['order', 'rating', 'comment']

    def validate_order(self, order):
        request = self.context['request']
        if order.client != request.user:
            raise serializers.ValidationError('You can only review your own orders.')
        if order.status != 'completed':
            raise serializers.ValidationError('Order must be completed before reviewing.')
        if hasattr(order, 'review'):
            raise serializers.ValidationError('This order has already been reviewed.')
        return order

    def create(self, validated_data):
        order = validated_data['order']
        return Review.objects.create(
            order=order,
            client=order.client,
            tailor=order.tailor,
            rating=validated_data['rating'],
            comment=validated_data.get('comment', ''),
        )
