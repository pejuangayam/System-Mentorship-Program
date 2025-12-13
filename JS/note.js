// --- Data Definition (Equivalent to sampleNotes) ---
    const sampleNotes = [
      {
        id: "1",
        name: "DR NUR ASHIKIN",
        type: "folder",
        filesCount: 2,
        createdBy: "DR NUR ASHIKIN BINTI MOHD RUSLI",
        dateUploaded: "2024-05-13 07:30:00",
      },
      {
        id: "2",
        name: "SIR HARIZ MUQRIZ",
        type: "folder",
        filesCount: 0,
        createdBy: "HARIZ MUQRIZ BIN DAUD",
        dateUploaded: "2025-01-15 10:30:00",
      },
      {
        id: "3",
        name: "HASNUL FITRI - UITM JASIN",
        type: "folder",
        filesCount: 0,
        createdBy: "MUHAMAD HASNUL FITRI BIN AWANG",
        dateUploaded: "2025-01-10 14:22:15",
      },
      {
        id: "4",
        name: "DR AINA NAJWA - PUNCAK ALAM",
        type: "folder",
        filesCount: 1,
        createdBy: "AINA NAJWA BINTI KAMARUL",
        dateUploaded: "2024-12-20 09:15:33",
      },
    ];

    // --- Core Logic (JavaScript) ---

    function renderTable(notesToDisplay) {
        const tableBody = document.querySelector('#notes-table tbody');
        // Clear existing rows
        tableBody.innerHTML = '';

        notesToDisplay.forEach((note, index) => {
            const row = tableBody.insertRow();
            // Apply highlight to the first row (index === 0)
            if (index === 0) {
                row.classList.add('highlight-row');
            }

            // Define icons and link classes using simple text/emojis
            let icon;
            let targetUrl;

            // *** LOGIC FOR LINK DESTINATION BASED ON TYPE ***
            if (note.type === 'folder') {
                icon = note.isLocked ? '🔒' : '📂';
                // Folder links to notesdowloader.html
                targetUrl = `notesdownloader.html?folder_id=${note.id}`;
            } else { // type === 'file'
                icon = note.isLocked ? '🔒' : '📄';
                // File links to a file detail page (e.g., file_detail.html)
                targetUrl = `file_detail.html?file_id=${note.id}`;
            }
            
            let nameClass = index === 0 ? 'text-primary-highlight' : 'text-primary';

            // Cell 1: Name (Icon, Name)
            const nameCell = row.insertCell();
            nameCell.classList.add('table-cell', 'cell-name');
            // Wrap the icon and name in an <a> tag
            nameCell.innerHTML = `
                <div class="d-flex align-items-center">
                    <span class="icon me-2">${icon}</span>
                    <a href="${targetUrl}" class="${nameClass} table-link">${note.name}</a>
                </div>
            `;

            // Cell 2: No. of files
            const filesCell = row.insertCell();
            filesCell.classList.add('table-cell', 'text-center');
            filesCell.innerText = note.filesCount || 0;

            // Cell 3: Created By
            const createdByCell = row.insertCell();
            createdByCell.classList.add('table-cell');
            createdByCell.innerText = note.createdBy;

            // Cell 4: Date Uploaded
            const dateCell = row.insertCell();
            dateCell.classList.add('table-cell');
            dateCell.innerText = note.dateUploaded;
        });
    }

    function filterTable() {
        const query = document.getElementById('search-input').value.toLowerCase();
        
        const filteredNotes = sampleNotes.filter(note =>
            note.name.toLowerCase().includes(query) ||
            note.createdBy.toLowerCase().includes(query)
        );

        renderTable(filteredNotes);
    }

    // Initial load: Render the table with all notes when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        renderTable(sampleNotes);
    });