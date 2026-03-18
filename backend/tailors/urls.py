from django.urls import path
from .views import (
    TailorListView, TailorDetailView, FeaturedTailorsView,
    TailorProfileUpdateView, PortfolioListCreateView, PortfolioDestroyView,
    CloudinarySignatureView,
)

urlpatterns = [
    path('', TailorListView.as_view(), name='tailor-list'),
    path('featured/', FeaturedTailorsView.as_view(), name='tailor-featured'),
    path('profile/', TailorProfileUpdateView.as_view(), name='tailor-profile-update'),
    path('portfolio/', PortfolioListCreateView.as_view(), name='portfolio-list'),
    path('portfolio/<int:pk>/', PortfolioDestroyView.as_view(), name='portfolio-delete'),
    path('upload-signature/', CloudinarySignatureView.as_view(), name='cloudinary-signature'),
    path('<int:pk>/', TailorDetailView.as_view(), name='tailor-detail'),
]
