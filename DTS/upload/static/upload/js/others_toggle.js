function toggleCustomTypeField() {
    const documentTypeSelect = document.getElementById('document_type');
    const customTypeContainer = document.getElementById('custom_type_container');
    
    if (documentTypeSelect.value === 'Others') {
        customTypeContainer.style.display = 'block';
    } else {
        customTypeContainer.style.display = 'none';
    }
}