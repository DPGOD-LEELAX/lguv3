from django.urls import path
from .views import DashboardView, DocumentDetailView, generate_tracking_slip, update_document

app_name = 'admin_panel'

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('document/<int:document_id>/details/', DocumentDetailView.as_view(), name='document-details'),
    path('document/<int:document_id>/update/', update_document, name='update-document'),
    path('document/<int:document_id>/generate_tracking_slip/', generate_tracking_slip, name='generate_tracking_slip'),
    

]
