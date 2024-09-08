// Function to show the approval modal
function uniqueConfirmApprove(docId) {
    // Set document ID in hidden input field
    document.getElementById('uniqueApproveDocumentId').value = docId;

    // Show the modal
    document.getElementById('uniqueApproveModal').style.display = 'block';
}

// Function to close the approval modal
function uniqueCloseModal() {
    document.getElementById('uniqueApproveModal').style.display = 'none';
}

// Function to handle the approval of a document
function uniqueHandleApprove() {
    var docId = document.getElementById('uniqueApproveDocumentId').value;

    fetch(`/dashboard/approve_document/${docId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': uniqueGetCookie('csrftoken')
        },
        body: JSON.stringify({ status: 'Approved' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            uniqueCloseModal();
            location.reload(); // Optionally reload to reflect changes
        } else {
            alert(data.error || 'An error occurred');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred');
    });
}

// Function to get CSRF token from cookies
function uniqueGetCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Use event delegation to listen for clicks on dynamically created elements
document.addEventListener('click', function(event) {
    // Handle clicks on the "Approve" button (using event delegation)
    if (event.target.closest('.action-icon[title="Approve"]')) {
        const docId = event.target.closest('.action-icon').dataset.docId;
        uniqueConfirmApprove(docId);
    }

    // Handle modal close if clicked outside the modal
    if (event.target === document.getElementById('uniqueApproveModal')) {
        uniqueCloseModal();
    }
});

// Event listener for the "Yes, Approve" button
document.getElementById('uniqueConfirmApproveBtn').addEventListener('click', uniqueHandleApprove);

// Event listener for the "Cancel" button and the close button
document.querySelectorAll('.unique-btn-cancel, .unique-modal-close').forEach(button => {
    button.addEventListener('click', uniqueCloseModal);
});

// Function to re-attach event listeners for dynamically generated content
function reAttachApproveListeners() {
    // Event listener for the "Yes, Approve" button
    document.getElementById('uniqueConfirmApproveBtn').addEventListener('click', uniqueHandleApprove);

    // Event listener for the "Cancel" button and the close button
    document.querySelectorAll('.unique-btn-cancel, .unique-modal-close').forEach(button => {
        button.addEventListener('click', uniqueCloseModal);
    });
}
