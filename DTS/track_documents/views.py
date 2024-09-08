# track_documents/views.py

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from upload.models import Document

def index(request):
    return render(request, 'track_documents/track_documents.html')

@csrf_exempt
def check_reference(request):
    if request.method == 'POST':
        import json
        data = json.loads(request.body)
        reference_number = data.get('reference_number')
        
        try:
            document = Document.objects.get(reference_number=reference_number)
            return JsonResponse({
                'exists': True,
                'document': {
                    'title': document.title,
                    'status': dict(Document.STATUS_CHOICES).get(document.status, 'Unknown'),
                    'assigned_to': document.assigned_to or 'N/A',
                    'uploaded_at': document.uploaded_at.strftime('%Y-%m-%d %H:%M:%S'),
                    'document_type': document.document_type or 'N/A'
                }
            })
        except Document.DoesNotExist:
            return JsonResponse({'exists': False})
    return JsonResponse({'error': 'Invalid request'}, status=400)
