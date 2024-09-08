// Event delegation for status buttons
document.addEventListener('click', function(event) {
    if (event.target.closest('.status-btn')) {
        const buttonId = event.target.closest('.status-btn').id;
        switch (buttonId) {
            case 'recent-btn':
                filterDocuments('recent');
                break;
            case 'approved-btn':
                filterDocuments('approved');
                break;
            case 'pending-btn':
                filterDocuments('pending');
                break;
            case 'completed-btn':
                filterDocuments('completed');
                break;
            case 'in-progress-btn':
                filterDocuments('in_progress');
                break;
            case 'disabled-btn':
                filterDocuments('disabled');
                break;
            case 'archived-btn':
                filterDocuments('archived');
                break;
        }
    }
});

// Function to filter documents based on status
function filterDocuments(status, page = 1) {
    fetch(`/dashboard/filter-documents/?status=${status}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            updateDocumentTable(data, status);
            reAttachApproveListeners(); // Reattach approval modal listeners after content update
            reAttachTrackingSlipListeners(); // Reattach tracking slip listeners after content update
        })
        .catch(error => console.error('Error fetching filtered documents:', error));
}

// Function to update the document table with filtered data
function updateDocumentTable(data, status) {
    const tableBody = document.querySelector('.document-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Update section title based on the status
    document.getElementById('section-title').textContent = capitalizeFirstLetter(status) + ' Documents';

    // Populate the table with filtered document data
    data.documents.forEach(doc => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doc.title}</td>
            <td>${doc.status}</td>
            <td>${doc.assigned_to}</td>
            <td>${doc.uploaded_at}</td>
            <td>${doc.from_person}</td>
            <td>${doc.reference_number}</td>
            <td>
                <div class="action-icons">
                    <div class="action-icon-box">
                        <a href="#" onclick="openViewDetailsModal(${doc.id})" class="action-icon" title="View Details">
                            <i class="bx bx-show"></i>
                        </a>
                    </div>
                    <div class="action-icon-box">
                        <a href="#" onclick="openEditDetailsModal(${doc.id})" class="action-icon" title="Edit">
                            <i class="bx bx-edit"></i>
                        </a>
                    </div>
                    <div class="action-icon-box">
                        <a href="#" class="action-icon" title="Delete" onclick="handleDeleteClick(this);">
                            <i class="bx bx-trash"></i>
                        </a>
                    </div>
                    <div class="action-icon-box">
                        <a href="#" class="action-icon" title="Approve" data-doc-id="${doc.id}">
                            <i class="bx bx-check"></i>
                        </a>
                    </div>
                    <div class="action-icon-box">
                        <a href="/document/${doc.id}/generate_tracking_slip/" class="action-icon" title="Generate Tracking Slip" target="_blank">
                            <i class="bx bx-receipt"></i>
                        </a>
                    </div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to re-attach the approval modal listeners
function reAttachApproveListeners() {
    document.querySelectorAll('.action-icon[title="Approve"]').forEach(approveIcon => {
        approveIcon.addEventListener('click', function (event) {
            event.preventDefault();
            const docId = this.getAttribute('data-doc-id');
            uniqueConfirmApprove(docId); // Call the uniqueConfirmApprove function with the document ID
        });
    });
}

// Function to re-attach tracking slip listeners
function reAttachTrackingSlipListeners() {
    document.querySelectorAll('.action-icon[title="Generate Tracking Slip"]').forEach(trackingSlipIcon => {
        trackingSlipIcon.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action (optional)
            const url = this.getAttribute('href');
            window.open(url, '_blank'); // Force open in a new tab
        });
    });
}

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

// Event listener for the "Yes, Approve" button
document.getElementById('uniqueConfirmApproveBtn').addEventListener('click', uniqueHandleApprove);

// Event listener for the "Cancel" button and the close button
document.querySelectorAll('.unique-btn-cancel, .unique-modal-close').forEach(button => {
    button.addEventListener('click', uniqueCloseModal);
});

// Event listener for clicking outside the modal to close it
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('uniqueApproveModal')) {
        uniqueCloseModal();
    }
});

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
