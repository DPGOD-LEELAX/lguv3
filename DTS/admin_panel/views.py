from django.shortcuts import render
from django.views import View  # Ensure this import is present
from upload.models import Document

class DashboardView(View):
    def get(self, request):
        # Get the total count of documents
        total_documents = Document.objects.count()

        # Fetch all documents
        documents = Document.objects.all()

        return render(request, 'admin_panel/dashboard.html', {
            'total_documents': total_documents,
            'documents': documents,  # Pass the documents to the template
        })
