# admin_panel/urls.py
from django.urls import path
from .views import DashboardView

app_name = 'admin_panel'  # Correct namespace



urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),  # Default dashboard view
    # Add other URL patterns here
]
