from django.urls import path
from .views import ReviewCreateView, TailorReviewListView, MyReceivedReviewsView

urlpatterns = [
    path('', ReviewCreateView.as_view(), name='review-create'),
    path('mine/', MyReceivedReviewsView.as_view(), name='my-reviews'),
    path('tailor/<uuid:tailor_id>/', TailorReviewListView.as_view(), name='tailor-reviews'),
]
