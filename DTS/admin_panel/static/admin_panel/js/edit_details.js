// // Function to open the edit details modal
// function openEditDetailsModal(documentId) {
//     // Fetch document details and populate the form (dummy implementation)
//     document.getElementById('editDetailsModal').style.display = 'block';
// }

// // Close the edit details modal when the user clicks the close button
// document.querySelectorAll('.edit-details-close').forEach(closeButton => {
//     closeButton.onclick = function() {
//         document.getElementById('editDetailsModal').style.display = 'none';
//     };
// });

// // Close the edit details modal if the user clicks anywhere outside of it
// window.onclick = function(event) {
//     if (event.target === document.getElementById('editDetailsModal')) {
//         document.getElementById('editDetailsModal').style.display = 'none';
//     }
// };

// // Toggle custom document type field visibility
// function toggleCustomTypeField() {
//     const documentTypeSelect = document.getElementById('editDetailsDocumentType');
//     const customTypeContainer = document.getElementById('customTypeContainer');
//     customTypeContainer.style.display = documentTypeSelect.value === 'Others' ? 'block' : 'none';
// }




    // Function to open the edit details modal
    function openEditDetailsModal(documentId) {
        fetch(`/document/${documentId}/details/`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    document.getElementById('editDetailsId').value = data.id;
                    document.getElementById('editDetailsTitle').value = data.title;
                    document.getElementById('editDetailsStatus').value = data.status;
                    document.getElementById('editDetailsAssignedTo').value = data.assigned_to;
                    document.getElementById('editDetailsFromPerson').value = data.from_person;
                    document.getElementById('editDetailsRemarks').value = data.remarks;
                    document.getElementById('editDetailsDocumentType').value = data.document_type;
                    document.getElementById('editDetailsOtherDocumentType').value = data.other_document_type;
                    
                    // Handle custom document type visibility
                    const customTypeContainer = document.getElementById('customTypeContainer');
                    if (data.document_type === 'Others') {
                        customTypeContainer.style.display = 'block';
                    } else {
                        customTypeContainer.style.display = 'none';
                    }
                    
                    document.getElementById('editDetailsModal').style.display = 'block';
                }
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }

    // Close the edit details modal when the user clicks the close button
    document.querySelector('.edit-details-close').addEventListener('click', () => {
        document.getElementById('editDetailsModal').style.display = 'none';
    });

    // Handle form submission
    document.getElementById('editDetailsForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        fetch(`/document/${formData.get('document_id')}/update/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest', // To help identify the request as AJAX
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value // CSRF Token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Document updated successfully');
                location.reload();  // Reload the page to reflect changes
            } else {
                alert('Error updating document');
            }
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    });

    // Close the edit details modal if the user clicks outside of it
    window.onclick = function(event) {
        if (event.target === document.getElementById('editDetailsModal')) {
            document.getElementById('editDetailsModal').style.display = 'none';
        }
    };

    // Toggle custom document type field visibility
    function toggleCustomTypeField() {
        const documentTypeSelect = document.getElementById('editDetailsDocumentType');
        const customTypeContainer = document.getElementById('customTypeContainer');
        customTypeContainer.style.display = documentTypeSelect.value === 'Others' ? 'block' : 'none';
    }


