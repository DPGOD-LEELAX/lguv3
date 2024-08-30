function handleDeleteClick(element) {
    event.preventDefault(); // Prevent the default link action

    // Example: Get an ID or other data if needed
    const itemId = element.getAttribute('data-item-id');

    // Show your confirmation modal
    showModal(itemId); 
}

function showModal(itemId) {
    document.getElementById('modal-item-id').value = itemId;
    document.getElementById('disable-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('disable-modal').style.display = 'none';
}

function confirmDisable() {
    const itemId = document.getElementById('modal-item-id').value;

    // Send a request to the backend to update the status to "Disabled"
    disableItem(itemId);

    // Hide the modal after confirming
    closeModal();
}

function disableItem(itemId) {
    // Example of making an AJAX request to update the status
    fetch(`/your-url-to-disable-item/${itemId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
        },
        body: JSON.stringify({
            'status': 'disable'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Item disabled:", data);
        // Update the UI accordingly
    })
    .catch(error => {
        console.error("Error disabling item:", error);
    });
}
