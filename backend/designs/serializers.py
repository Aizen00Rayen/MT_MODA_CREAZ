from rest_framework import serializers
from .models import Design


class DesignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Design
        fields = [
            'id', 'prompt_text', 'style_tags', 'generated_image_url',
            'color_palette', 'name', 'is_saved', 'created_at',
        ]
        read_only_fields = ['id', 'generated_image_url', 'color_palette', 'created_at']


class DesignCreateSerializer(serializers.Serializer):
    prompt_text = serializers.CharField(max_length=1000)
    style_tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        default=list,
        allow_empty=True,
    )
