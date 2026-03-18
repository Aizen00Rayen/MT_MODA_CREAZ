from django.urls import path
from .admin_views import AdminStatsView, AdminUserListView, AdminUserBanView, AdminTailorVerifyView

urlpatterns = [
    path('stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('users/', AdminUserListView.as_view(), name='admin-users'),
    path('users/<uuid:pk>/ban/', AdminUserBanView.as_view(), name='admin-user-ban'),
    path('tailors/<int:pk>/verify/', AdminTailorVerifyView.as_view(), name='admin-tailor-verify'),
]
