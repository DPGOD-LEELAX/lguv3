

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const tableRows = document.querySelectorAll('.document-table tbody tr');

    searchInput.addEventListener('keyup', function() {
        const query = searchInput.value.toLowerCase();

        tableRows.forEach(row => {
            const cells = row.getElementsByTagName('td');
            let match = false;

            for (let i = 0; i < cells.length - 1; i++) { 
                if (cells[i].textContent.toLowerCase().includes(query)) {
                    match = true;
                    break;
                }
            }

            row.style.display = match ? '' : 'none';
        });
    });
});