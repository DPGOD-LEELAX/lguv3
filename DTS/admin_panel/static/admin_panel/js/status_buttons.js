// Add event listeners for status buttons
document.getElementById('recent-btn').addEventListener('click', () => filterDocuments('recent'));
document.getElementById('approved-btn').addEventListener('click', () => filterDocuments('approved'));
document.getElementById('pending-btn').addEventListener('click', () => filterDocuments('pending'));
document.getElementById('completed-btn').addEventListener('click', () => filterDocuments('completed'));
document.getElementById('in-progress-btn').addEventListener('click', () => filterDocuments('in_progress'));

// Function to filter documents based on status
function filterDocuments(status, page = 1) {
    fetch(`/dashboard/filter-documents/?status=${status}&page=${page}`)
        .then(response => response.json())
        .then(data => updateDocumentTable(data, status))
        .catch(error => console.error('Error fetching filtered documents:', error));
}

// Function to update the document table with filtered data
function updateDocumentTable(data, status) {
    const tableBody = document.querySelector('.document-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Update section title based on the status
    document.getElementById('section-title').textContent = capitalizeFirstLetter(status) + ' Documents';

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
                        <a href="#" class="action-icon" title="Approve" onclick="confirmApprove(${doc.id})">
                            <i class="bx bx-check"></i>
                        </a>
                    </div>
                    <div class="action-icon-box">
                        <a href="#" class="action-icon" title="Generate Tracking Slip" onclick="openTrackingSlipModal(${doc.id})">
                            <i class="bx bx-receipt"></i>
                        </a>
                    </div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
