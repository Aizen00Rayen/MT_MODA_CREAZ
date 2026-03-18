from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from core.permissions import IsClient
from .models import Review
from .serializers import ReviewSerializer, ReviewCreateSerializer


class ReviewCreateView(generics.CreateAPIView):
    permission_classes = [IsClient]
    serializer_class = ReviewCreateSerializer


class TailorReviewListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(tailor_id=self.kwargs['tailor_id']).select_related('client')


class MyReceivedReviewsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(tailor=self.request.user).select_related('client')
