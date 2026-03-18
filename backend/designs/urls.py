from django.urls import path
from .views import DesignGenerateView, DesignListView, DesignSaveToggleView

urlpatterns = [
    path('', DesignListView.as_view(), name='design-list'),
    path('generate/', DesignGenerateView.as_view(), name='design-generate'),
    path('<int:pk>/save/', DesignSaveToggleView.as_view(), name='design-save-toggle'),
]
