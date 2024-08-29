// Get the edit modal elements
var editModal = document.getElementById("editModal");
var editCloseBtn = editModal.getElementsByClassName("close")[0];

// Function to open the edit modal with document details pre-filled
function openEditModal(documentId) {
    // Fetch document details using AJAX
    fetch(`/document/${documentId}/details/`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("editDocumentId").value = documentId;
            document.getElementById("editTitle").value = data.title;
            document.getElementById("editStatus").value = data.status;
            document.getElementById("editAssignedTo").value = data.assigned_to;
            document.getElementById("editRemarks").value = data.remarks;
            editModal.style.display = "block";
        });
}

// Close the edit modal when the user clicks on the close button
editCloseBtn.onclick = function() {
    editModal.style.display = "none";
}

// Close the edit modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == editModal) {
        editModal.style.display = "none";
    }
}

// Handle the form submission for editing
document.getElementById("editForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather the form data
    var documentId = document.getElementById("editDocumentId").value;
    var formData = new FormData(this);

    // Send an AJAX request to update the document
    fetch(`/document/${documentId}/edit/`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the document in the UI, close the modal, etc.
            editModal.style.display = "none";
            // Optionally, refresh the page or update the document list dynamically
        } else {
            // Handle errors, display error messages, etc.
            alert('Failed to update the document');
        }
    });
}
