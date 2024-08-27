# core/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', include('admin_panel.urls', namespace='admin_panel_dashboard')),  # Unique namespace
    path('', include('admin_panel.urls', namespace='admin_panel_home')),  # Unique namespace
    path('upload/', include('upload.urls')),  # Ensure this path is correct
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
