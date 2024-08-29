from django.shortcuts import render
from django.views import View
from django.core.paginator import Paginator
from upload.models import Document
from django.http import JsonResponse
# from django.shortcuts import get_object_or_404


class DashboardView(View):
    def get(self, request):
        # Get the total count of documents
        total_documents = Document.objects.count()

        # Fetch all documents
        document_list = Document.objects.all()

        # Set up pagination
        paginator = Paginator(document_list, 10)  # Show 10 documents per page
        page_number = request.GET.get('page')
        documents = paginator.get_page(page_number)

        return render(request, 'admin_panel/dashboard.html', {
            'total_documents': total_documents,
            'documents': documents,  # Pass the paginated documents to the template
        })
    

class DocumentDetailView(View):
    def get(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
            data = {
                'title': document.title,
                'status': document.status,
                'assigned_to': document.assigned_to,
                'remarks': document.remarks,
            }
            return JsonResponse(data)
        except Document.DoesNotExist:
            return JsonResponse({'error': 'Document not found'}, status=404)

class DocumentEditView(View):
    def post(self, request, document_id):
        try:
            document = Document.objects.get(pk=document_id)
            document.title = request.POST.get('title')
            document.status = request.POST.get('status')
            document.assigned_to = request.POST.get('assigned_to')
            document.remarks = request.POST.get('remarks')
            document.save()
            return JsonResponse({'success': True})
        except Document.DoesNotExist:
            return JsonResponse({'error': 'Document not found'}, status=404)

