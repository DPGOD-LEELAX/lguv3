from django.urls import path
from .views import DashboardView, DocumentDetailView, FilterDocumentsView, generate_tracking_slip, update_document
from . import views

app_name = 'admin_panel'

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('document/<int:document_id>/details/', DocumentDetailView.as_view(), name='document-details'),
    path('document/<int:document_id>/update/', update_document, name='update-document'),
    path('document/<int:document_id>/generate_tracking_slip/', generate_tracking_slip, name='generate_tracking_slip'),
    path('filter-documents/', FilterDocumentsView.as_view(), name='filter_documents'),
    path('dashboard/approve_document/<int:doc_id>/', views.approve_document, name='approve_document'),
    

]
