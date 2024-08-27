# upload/models.py
import os
from django.db import models

class Document(models.Model):
    STATUS_CHOICES = [
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]
    
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='documents/')  # This will be overridden
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='in_progress')
    assigned_to = models.CharField(max_length=100, blank=True, null=True)
    from_person = models.CharField(max_length=100, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    reference_number = models.CharField(max_length=50, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Save the instance to get a primary key
        if not self.pk:
            super().save(*args, **kwargs)
        
        if not self.reference_number:
            # Generate unique numeric reference number based on primary key
            self.reference_number = str(self.pk)
        
        # Custom file path logic
        if self.file:
            file_extension = os.path.splitext(self.file.name)[1].lower()
            file_folder = {
                '.pdf': 'PDF',
                '.docx': 'DOCX',
                '.csv': 'CSV',
                '.txt': 'TXT',
                '.ppt': 'PPT',
                '.xls': 'XLS'
            }.get(file_extension, 'OTHERS')

            owner_folder = self.from_person if self.from_person else 'Unknown'
            upload_to_folder = os.path.join('documents', file_folder, owner_folder)

            # Update the file name with the new path
            self.file.name = os.path.join(upload_to_folder, os.path.basename(self.file.name))
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
