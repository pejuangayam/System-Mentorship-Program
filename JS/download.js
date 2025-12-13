// --- Mock Data (Simulating files inside each folder) ---
    const folderData = {
        "1": { // DR NUR ASHIKIN
            name: "DR NUR ASHIKIN",
            files: [
                { name: "Week 1 - Topic 1 Notes", type: "PDF", size: "1.2 MB", link: "#" },
                { name: "Week 2 - Topic 2 Notes", type: "PDF", size: "1.5 MB", link: "#" }
            ]
        },
        "2": { // SIR HARIZ MUQRIZ
            name: "SIR HARIZ MUQRIZ",
            files: [] // No files
        },
        "4": { // DR AINA NAJWA - PUNCAK ALAM
            name: "DR AINA NAJWA - PUNCAK ALAM",
            files: [
                { name: "Lecture 1", type: "DOCX", size: "800 KB", link: "#" }
            ]
        }
        // Add other folder IDs here as needed
    };

    // Helper function to get query parameter
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function loadFolderContent() {
        // 1. Get the folder ID from the URL
        const folderId = getQueryParam('folder_id');
        
        if (!folderId || !folderData[folderId]) {
            document.getElementById('folder-title').innerText = "Folder Not Found";
            return;
        }
        
        const folder = folderData[folderId];
        document.getElementById('folder-title').innerText = `${folder.name}'s Files`;
        
        const tableBody = document.querySelector('#folder-content-table tbody');
        tableBody.innerHTML = '';

        if (folder.files.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" class="empty-message">This folder is empty.</td></tr>';
            return;
        }

        // 2. Populate the table with files in that folder
        folder.files.forEach(file => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td class="table-cell file-name-cell"><span class="icon me-2">📄</span> ${file.name}</td>
                <td class="table-cell">${file.type}</td>
                <td class="table-cell">${file.size}</td>
                <td class="table-cell text-center">
                    <a href="${file.link}" class="btn btn-message btn-small" download="${file.name}">Download</a>
                </td>
            `;
        });
    }

    // Load content when the page is ready
    document.addEventListener('DOMContentLoaded', loadFolderContent);