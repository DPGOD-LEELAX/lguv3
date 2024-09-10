from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'file_manager' 

urlpatterns = [
    path('', views.index, name='index'),  # The view that will be linked
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
