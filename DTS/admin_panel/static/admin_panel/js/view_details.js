// Function to open the "View Details" modal and fetch document details
function openViewDetailsModal(documentId) {
    fetch(`/document/${documentId}/details/`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalStatus').textContent = data.status;
                document.getElementById('modalAssignedTo').textContent = data.assigned_to;
                document.getElementById('modalUploadedAt').textContent = data.uploaded_at;
                document.getElementById('modalFromPerson').textContent = data.from_person;
                document.getElementById('modalReferenceNumber').textContent = data.reference_number;
                document.getElementById('modalRemarks').textContent = data.remarks;

                document.getElementById('viewDetailsModal').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching document details:', error);
        });
}

// Close the modal when the user clicks the close button
document.querySelectorAll('.view-details-close').forEach(closeButton => {
    closeButton.onclick = function() {
        this.closest('.view-details-modal').style.display = 'none';
    };
});

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById('viewDetailsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
