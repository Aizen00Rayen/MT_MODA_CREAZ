from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status

from .permissions import IsAdminRole
from .serializers import UserProfileSerializer

User = get_user_model()


class AdminStatsView(APIView):
    permission_classes = [IsAdminRole]

    def get(self, request):
        from tailors.models import TailorProfile
        from orders.models import Order
        return Response({
            'total_users': User.objects.count(),
            'total_clients': User.objects.filter(role='client').count(),
            'total_tailors': User.objects.filter(role='tailor').count(),
            'verified_tailors': TailorProfile.objects.filter(is_verified=True).count(),
            'pending_verification': TailorProfile.objects.filter(is_verified=False).count(),
            'total_orders': Order.objects.count(),
            'active_orders': Order.objects.exclude(status__in=['completed', 'cancelled']).count(),
        })


class AdminUserListView(generics.ListAPIView):
    permission_classes = [IsAdminRole]
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()


class AdminUserBanView(APIView):
    permission_classes = [IsAdminRole]

    def post(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            user.is_active = not user.is_active
            user.save(update_fields=['is_active'])
            action = 'unbanned' if user.is_active else 'banned'
            return Response({'detail': f'User {action}.', 'is_active': user.is_active})
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)


class AdminTailorVerifyView(APIView):
    permission_classes = [IsAdminRole]

    def post(self, request, pk):
        from tailors.models import TailorProfile
        try:
            profile = TailorProfile.objects.get(pk=pk)
            profile.is_verified = not profile.is_verified
            profile.save(update_fields=['is_verified'])
            return Response({'detail': 'Updated.', 'is_verified': profile.is_verified})
        except TailorProfile.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
