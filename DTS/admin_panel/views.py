from django.shortcuts import render
from django.views import View
from django.core.paginator import Paginator
from upload.models import Document
from django.http import JsonResponse, HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.graphics.barcode import code128
from io import BytesIO
from django.views.decorators.http import require_POST

class DashboardView(View):
    def get(self, request):
        total_documents = Document.objects.count()
        document_list = Document.objects.all()
        paginator = Paginator(document_list, 10)  
        page_number = request.GET.get('page', 1)  # Default to page 1 if no page number is provided
        documents = paginator.get_page(page_number)
        return render(request, 'admin_panel/dashboard.html', {
            'total_documents': total_documents,
            'documents': documents,  
        })

class DocumentDetailView(View):
    def get(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
            data = {
                'id': document.id,
                'title': document.title,
                'status': document.get_status_display(),
                'assigned_to': document.assigned_to or '',  # Handle empty values
                'uploaded_at': document.uploaded_at.strftime('%Y-%m-%d %H:%M:%S') if document.uploaded_at else '',  # Handle empty values
                'from_person': document.from_person or '',
                'reference_number': document.reference_number or '',
                'remarks': document.remarks or '',
                'document_type': document.document_type or '',
                'other_document_type': document.other_document_type or ''
            }
            return JsonResponse(data)
        except Document.DoesNotExist:
            return JsonResponse({'error': 'Document not found'}, status=404)

def generate_tracking_slip(request, document_id):
    try:
        document = Document.objects.get(pk=document_id)
    except Document.DoesNotExist:
        return HttpResponse("Document not found", status=404)

    if not document.reference_number:
        return HttpResponse("Reference number is missing", status=400)
    
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)

    p.drawString(100, 750, f"Reference Number: {document.reference_number}")
    p.drawString(100, 730, f"Title: {document.title}")
    p.drawString(100, 710, f"Assigned To: {document.assigned_to or 'N/A'}")  # Handle empty values
    p.drawString(100, 690, f"Status: {document.get_status_display()}")

    barcode = code128.Code128(document.reference_number, barHeight=20, x=1, y=20)
    barcode.drawOn(p, 100, 650)

    p.showPage()
    p.save()

    buffer.seek(0)
    return HttpResponse(buffer, content_type='application/pdf')

@require_POST
def update_document(request, document_id):
    try:
        document = Document.objects.get(pk=document_id)
    except Document.DoesNotExist:
        return JsonResponse({'error': 'Document not found'}, status=404)

    # Update document fields from POST data
    document.title = request.POST.get('title', document.title)
    document.status = request.POST.get('status', document.status)
    document.assigned_to = request.POST.get('assigned_to', document.assigned_to)
    document.from_person = request.POST.get('from_person', document.from_person)
    document.remarks = request.POST.get('remarks', document.remarks)
    document.document_type = request.POST.get('document_type', document.document_type)
    document.other_document_type = request.POST.get('other_document_type', document.other_document_type)
    document.save()

    return JsonResponse({'success': 'Document updated successfully'})
