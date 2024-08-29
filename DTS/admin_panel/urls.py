# admin_panel/urls.py
from django.urls import path
from .views import DashboardView
from .views import DocumentDetailView, DocumentEditView



app_name = 'admin_panel'  # Correct namespace



urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),  # Default dashboard view
    path('document/<int:document_id>/details/', DocumentDetailView.as_view(), name='document-details'),
    path('document/<int:document_id>/edit/', DocumentEditView.as_view(), name='document_edit'),
    # Add other URL patterns here
]
