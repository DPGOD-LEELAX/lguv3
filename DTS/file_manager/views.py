from django.shortcuts import render
from django.conf import settings
from pathlib import Path

def index(request):
    # Use pathlib to handle paths
    base_path = settings.MEDIA_ROOT
    current_path = Path(request.GET.get('path', base_path))

    try:
        # List directories and files
        items = [entry.name for entry in current_path.iterdir()]
        file_items = []

        for item in items:
            full_path = current_path / item
            is_dir = full_path.is_dir()
            extension = full_path.suffix if not is_dir else None

            file_items.append({
                'name': item,
                'full_path': str(full_path),  # Convert Path object to string for rendering
                'is_dir': is_dir,
                'extension': extension
            })

        context = {
            'current_path': str(current_path),  # Convert Path object to string for rendering
            'files': file_items
        }
        return render(request, 'file_manager/file_manager.html', context)

    except FileNotFoundError:
        return render(request, 'file_manager/file_manager.html', {'error': 'Path not found'})
