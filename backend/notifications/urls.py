from django.urls import path
from .views import NotificationListView, NotificationMarkReadView, UnreadCountView

urlpatterns = [
    path('', NotificationListView.as_view(), name='notification-list'),
    path('unread-count/', UnreadCountView.as_view(), name='notification-unread-count'),
    path('mark-read/', NotificationMarkReadView.as_view(), name='notification-mark-all-read'),
    path('<int:pk>/mark-read/', NotificationMarkReadView.as_view(), name='notification-mark-read'),
]
