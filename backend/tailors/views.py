import time
from django.conf import settings
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import IsTailor
from .models import TailorProfile, PortfolioItem
from .serializers import (
    TailorProfileListSerializer, TailorProfileDetailSerializer,
    TailorProfileUpdateSerializer, PortfolioItemSerializer,
)
from .filters import TailorFilter


class TailorListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = TailorProfileListSerializer
    filterset_class = TailorFilter
    ordering_fields = ['avg_rating', 'price_base', 'total_orders', 'experience_years']
    ordering = ['-avg_rating']

    def get_queryset(self):
        return TailorProfile.objects.select_related('user').all()


class TailorDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = TailorProfileDetailSerializer
    queryset = TailorProfile.objects.select_related('user').prefetch_related('portfolio')


class FeaturedTailorsView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = TailorProfileListSerializer

    def get_queryset(self):
        return TailorProfile.objects.filter(
            is_verified=True, is_available=True
        ).order_by('-avg_rating', '-total_orders')[:6]


class TailorProfileUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsTailor]
    serializer_class = TailorProfileUpdateSerializer

    def get_object(self):
        profile, _ = TailorProfile.objects.get_or_create(user=self.request.user)
        return profile


class PortfolioListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsTailor]
    serializer_class = PortfolioItemSerializer

    def get_queryset(self):
        return PortfolioItem.objects.filter(tailor__user=self.request.user)

    def perform_create(self, serializer):
        profile = TailorProfile.objects.get(user=self.request.user)
        serializer.save(tailor=profile)


class PortfolioDestroyView(generics.DestroyAPIView):
    permission_classes = [IsTailor]
    serializer_class = PortfolioItemSerializer

    def get_queryset(self):
        return PortfolioItem.objects.filter(tailor__user=self.request.user)


class CloudinarySignatureView(APIView):
    permission_classes = [IsTailor]

    def get(self, request):
        try:
            import cloudinary.utils
            timestamp = int(time.time())
            folder = f'mt_moda_creaz/portfolio/{request.user.id}'
            params = {'timestamp': timestamp, 'folder': folder}
            signature = cloudinary.utils.api_sign_request(
                params, settings.CLOUDINARY_STORAGE['API_SECRET']
            )
            return Response({
                'signature': signature,
                'timestamp': timestamp,
                'api_key': settings.CLOUDINARY_STORAGE['API_KEY'],
                'cloud_name': settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
                'folder': folder,
            })
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
