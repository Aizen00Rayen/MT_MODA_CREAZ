from rest_framework import serializers
from .models import Order, OrderStep, Message
from core.serializers import UserMinimalSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = UserMinimalSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'created_at', 'is_read']
        read_only_fields = ['id', 'sender', 'created_at']


class OrderStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStep
        fields = ['id', 'step_name', 'status', 'completed_at', 'note', 'photos']
        read_only_fields = ['id']


class OrderListSerializer(serializers.ModelSerializer):
    client = UserMinimalSerializer(read_only=True)
    tailor = UserMinimalSerializer(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'client', 'tailor', 'status', 'price_agreed',
            'payment_status', 'created_at', 'delivery_date_estimated',
        ]


class OrderDetailSerializer(serializers.ModelSerializer):
    client = UserMinimalSerializer(read_only=True)
    tailor = UserMinimalSerializer(read_only=True)
    steps = OrderStepSerializer(many=True, read_only=True)
    messages = MessageSerializer(many=True, read_only=True)
    design_id = serializers.PrimaryKeyRelatedField(
        source='design', read_only=True
    )
    design_image = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'client', 'tailor', 'design_id', 'design_image',
            'description', 'style_tags', 'status', 'price_agreed',
            'payment_status', 'created_at', 'updated_at',
            'delivery_date_estimated', 'notes', 'steps', 'messages',
        ]

    def get_design_image(self, obj):
        if obj.design:
            return obj.design.generated_image_url
        return None


class OrderCreateSerializer(serializers.ModelSerializer):
    tailor_id = serializers.UUIDField(write_only=True)
    design_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = Order
        fields = [
            'tailor_id', 'design_id', 'description', 'style_tags',
            'delivery_date_estimated', 'notes',
        ]

    def validate_tailor_id(self, value):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        try:
            user = User.objects.get(id=value, role='tailor')
            return value
        except User.DoesNotExist:
            raise serializers.ValidationError('Tailor not found.')

    def create(self, validated_data):
        tailor_id = validated_data.pop('tailor_id')
        design_id = validated_data.pop('design_id', None)
        from django.contrib.auth import get_user_model
        User = get_user_model()
        tailor = User.objects.get(id=tailor_id)
        client = self.context['request'].user

        order = Order.objects.create(
            client=client,
            tailor=tailor,
            design_id=design_id,
            **validated_data,
        )
        return order


class OrderStatusUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=[s[0] for s in Order.status.field.choices])

    def validate(self, data):
        order = self.context['order']
        new_status = data['status']
        if not order.can_transition_to(new_status):
            raise serializers.ValidationError(
                f'Cannot transition from "{order.status}" to "{new_status}".'
            )
        return data
