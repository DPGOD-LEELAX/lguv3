# upload/urls.py
from django.urls import path
from .views import UploadDocumentView, SuccessView

app_name = 'upload'  # This sets the namespace for this app

urlpatterns = [
    path('upload/', UploadDocumentView.as_view(), name='upload_document'),
    path('success/', SuccessView.as_view(), name='success'),
]
