document.addEventListener('DOMContentLoaded', () => {
    const fileManagerGrid = document.querySelector('.file-manager-grid');

    fileManagerGrid.addEventListener('dragstart', (event) => {
        if (event.target.classList.contains('file-item')) {
            event.dataTransfer.setData('text/plain', event.target.dataset.path);
            event.target.classList.add('dragging');
        }
    });

    fileManagerGrid.addEventListener('dragend', (event) => {
        if (event.target.classList.contains('file-item')) {
            event.target.classList.remove('dragging');
        }
    });

    fileManagerGrid.addEventListener('dragover', (event) => {
        event.preventDefault();
        if (event.target.classList.contains('file-item') && event.target.dataset.type === 'folder') {
            event.target.classList.add('over');
        }
    });

    fileManagerGrid.addEventListener('dragleave', (event) => {
        if (event.target.classList.contains('file-item') && event.target.dataset.type === 'folder') {
            event.target.classList.remove('over');
        }
    });

    fileManagerGrid.addEventListener('drop', (event) => {
        event.preventDefault();
        const filePath = event.dataTransfer.getData('text/plain');
        const targetElement = event.target;

        if (targetElement.classList.contains('file-item') && targetElement.dataset.type === 'folder') {
            const targetPath = targetElement.dataset.path;
            moveFile(filePath, targetPath);
        }
        targetElement.classList.remove('over');
    });

    fileManagerGrid.addEventListener('dblclick', (event) => {
        const fileItem = event.target.closest('.file-item');
        if (fileItem) {
            const path = fileItem.dataset.path;
            if (fileItem.dataset.type === 'folder') {
                window.location.href = `?path=${encodeURIComponent(path)}`;
            } else {
                openFile(path);
            }
        }
    });

    function moveFile(filePath, targetPath) {
        // Example function; replace with your AJAX call to the server
        console.log(`Move ${filePath} to ${targetPath}`);
        // Implement file-moving logic on the server
    }

    function openFile(path) {
        // Open the file URL in a new tab
        window.open(path, '_blank');
    }
});
