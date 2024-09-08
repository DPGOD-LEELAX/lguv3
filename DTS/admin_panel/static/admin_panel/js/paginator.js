document.addEventListener('DOMContentLoaded', function() {
    const documentTable = document.querySelector('.document-table');
    let currentPage = 1;

    // Event delegation for paginator buttons
    document.addEventListener('click', function(event) {
        if (event.target.closest('.prev-button')) {
            if (currentPage > 1) {
                currentPage--;
                updateTable('previous');
                // Fetch the previous page
                filterDocuments(document.getElementById('section-title').dataset.status, currentPage);
            }
        }

        if (event.target.closest('.next-button')) {
            currentPage++;
            updateTable('next');
            // Fetch the next page
            filterDocuments(document.getElementById('section-title').dataset.status, currentPage);
        }
    });

    // Function to update the table's visual effect when switching pages
    function updateTable(direction) {
        if (direction === 'next') {
            documentTable.classList.add('next-page');
        } else if (direction === 'previous') {
            documentTable.classList.add('previous-page');
        }
        
        // Remove the transition class after the animation is complete
        setTimeout(function() {
            documentTable.classList.remove('next-page', 'previous-page');
            documentTable.classList.add('fade-in');
        }, 500);
    }
});
