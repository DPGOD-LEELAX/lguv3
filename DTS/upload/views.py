# upload/views.py
from django.shortcuts import render, redirect
from django.views import View
from .models import Document



class UploadDocumentView(View):
    def get(self, request):
        documents = Document.objects.all()  # Fetch all documents from the database
        return render(request, 'upload/upload_document.html', {'documents': documents})

    def post(self, request):
        title = request.POST.get('title')
        file = request.FILES.get('file')
        assigned_to = request.POST.get('assigned_to')
        from_person = request.POST.get('from_person')
        remarks = request.POST.get('remarks')
        document_type = request.POST.get('document_type')
        other_document_type = request.POST.get('other_document_type_input') if document_type == 'Others' else None

        if title and file:
            document = Document(
                title=title,
                file=file,
                assigned_to=assigned_to,
                from_person=from_person,
                remarks=remarks,
                document_type=document_type if document_type != 'Others' else 'Others',
                other_document_type=other_document_type if document_type == 'Others' else None,
            )
            document.save()
            return redirect('upload:success')
        return render(request, 'upload/upload_document.html', {
            'error': 'Title and file are required fields.'
        })



class SuccessView(View):
    def get(self, request):
        return render(request, 'upload/upload_success.html')
    

class DashboardView(View):
    def get(self, request):
        documents = Document.objects.all()  
        return render(request, 'admin_panel/dashboard.html', {'documents': documents})





