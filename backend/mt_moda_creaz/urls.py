from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('core.urls')),
    path('api/tailors/', include('tailors.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/designs/', include('designs.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/admin/', include('core.admin_urls')),
]
