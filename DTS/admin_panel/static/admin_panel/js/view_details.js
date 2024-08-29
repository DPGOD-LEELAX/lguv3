// Get modal elements
var modal = document.getElementById("documentModal");
var closeBtn = document.getElementsByClassName("close")[0];

// Function to open the modal with document details
// Function to open the modal with document details
function openModal(documentId) {
    // Fetch document details using AJAX
    fetch(`/document/${documentId}/details/`)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Debug: Check the data structure
            
            // Update modal content
            document.getElementById("modalTitle").textContent = data.title || 'N/A';
            document.getElementById("modalStatus").textContent = data.status || 'N/A';
            document.getElementById("modalAssignedTo").textContent = data.assigned_to || 'N/A';
            document.getElementById("modalUploadedAt").textContent = data.uploaded_at ? new Date(data.uploaded_at).toLocaleString() : 'N/A';
            document.getElementById("modalFromPerson").textContent = data.from_person || 'N/A';
            document.getElementById("modalReferenceNumber").textContent = data.reference_number || 'N/A';
            document.getElementById("modalRemarks").textContent = data.remarks || 'N/A';
            
            modal.style.display = "block";
        })
        .catch(error => {
            console.error('Error fetching document details:', error);
        });
}


// Close the modal when the user clicks on the close button
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
