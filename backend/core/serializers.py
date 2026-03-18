from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'role']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone', 'role', 'wilaya', 'created_at']
        read_only_fields = ['id', 'email', 'role', 'created_at']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    tokens = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone', 'role', 'wilaya', 'password', 'tokens']
        read_only_fields = ['id', 'tokens']

    def validate_role(self, value):
        if value == 'admin':
            raise serializers.ValidationError("Cannot register as admin.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def get_tokens(self, user):
        refresh = RefreshToken.for_user(user)
        refresh['role'] = user.role
        refresh['full_name'] = user.full_name
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }
