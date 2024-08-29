document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const documentTable = document.querySelector('.document-table');
    
    let currentPage = 1;

    function updateTable(direction) {
        // Add the appropriate class based on the direction of the transition
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

    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateTable('previous');
            // Logic to update table content based on currentPage
        }
    });

    nextButton.addEventListener('click', function() {
        currentPage++;
        updateTable('next');
        // Logic to update table content based on currentPage
    });
});
