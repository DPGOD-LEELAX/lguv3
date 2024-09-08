document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reference-check-form');
    const modal = document.getElementById('reference-result-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalContent = document.getElementById('modal-result-content');
    const printButton = document.getElementById('print-button');
    const cancelButton = document.getElementById('cancel-button');

    // Close modal on button click
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    cancelButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal on click outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Print functionality
    printButton.addEventListener('click', function() {
        window.print();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const referenceNumber = document.getElementById('reference-number').value;
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        fetch('/track-documents/check-reference/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken  // Pass CSRF token here
            },
            body: JSON.stringify({ reference_number: referenceNumber })
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                modalContent.innerHTML = `
                    <p><strong>Title:</strong> ${data.document.title}</p>
                    <p><strong>Status:</strong> ${data.document.status}</p>
                    <p><strong>Assigned To:</strong> ${data.document.assigned_to}</p>
                    <p><strong>Uploaded At:</strong> ${data.document.uploaded_at}</p>
                    <p><strong>Document Type:</strong> ${data.document.document_type}</p>
                `;
            } else {
                modalContent.innerHTML = '<p>No document found with the provided reference number.</p>';
            }
            modal.style.display = 'flex';  // Show the modal
        })
        .catch(error => {
            console.error('Error:', error);
            modalContent.innerHTML = '<p>An error occurred while checking the reference number.</p>';
            modal.style.display = 'flex';  // Show the modal even if there's an error
        });
    });
});
