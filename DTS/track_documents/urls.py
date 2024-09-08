# track_documents/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='track_documents_index'),
    path('check-reference/', views.check_reference, name='check_reference'),
]
