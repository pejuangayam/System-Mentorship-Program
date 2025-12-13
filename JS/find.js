// Updated Data for the Notes Content Table (Simplified)
const notesData = [
    {
        no: 1,
        name: "DR NUR ASHIKIN BINTI MOHD RUSLI",
        email: "nurashikin@mentorship.my",
        status: "Approved",
    },
    {
        no: 2,
        name: "HARIZ MUQRIZ BIN DAUD",
        email: "hariz.muqriz@mentorship.my",
        status: "Not Approved",
    },
];

// Data for the Find a Mentor Section
const mentorData = [
    {
        id: 1,
        name: "Dr. Emily Rodriguez",
        role: "Mathematics and Statistics expert",
        rating: 4.9,
        sessions: 98,
        expertise: ["Mathematics", "Statistics", "Data Science"],
        image: "https://i.pravatar.cc/150?img=1" 
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        role: "Computer Science Professor with 15 years of experience",
        rating: 4.8,
        sessions: 127,
        expertise: ["Computer Science", "Machine Learning", "Python"],
        image: "https://i.pravatar.cc/150?img=2" 
    },
    {
        id: 3,
        name: "Prof. David Kim",
        role: "Physics and Engineering specialist",
        rating: 4.7,
        sessions: 84,
        expertise: ["Physics", "Engineering", "Mathematics"],
        image: "https://i.pravatar.cc/150?img=3" 
    },
    {
        id: 4,
        name: "Dr. Sarah Johnson",
        role: "Finance and Budgeting expert",
        rating: 4.5,
        sessions: 55,
        expertise: ["Finance", "Data Science", "Statistics"],
        image: "https://i.pravatar.cc/150?img=4"
    },
    {
        id: 5,
        name: "Aisha Khan",
        role: "UI/UX and Design Thinking",
        rating: 4.9,
        sessions: 150,
        expertise: ["UI/UX", "Design Thinking", "Python"],
        image: "https://i.pravatar.cc/150?img=5" 
    },
];

let currentMentors = [...mentorData];
let activeFilter = 'all';
let activeSort = 'rating';


// --- NOTES TABLE LOGIC ---

function renderNotesTable(notes) {
    const tableBody = document.querySelector('#notes-table tbody');
    tableBody.innerHTML = '';

    notes.forEach((note) => {
        const row = tableBody.insertRow();
        const statusClass = `status-${note.status}`;

        // *** UPDATED ROW CONTENT ***
        row.innerHTML = `
            <td class="text-center">${note.no}</td>
            <td>${note.name}</td>
            <td>${note.email}</td>
            <td class="text-center"><span class="status-badge ${statusClass}">${note.status}</span></td>
        `;
    });
}

function filterNotesTable() {
    const query = document.getElementById('notes-search-input').value.toLowerCase();
    
    // *** UPDATED FILTER LOGIC ***
    const filteredNotes = notesData.filter(note =>
        note.name.toLowerCase().includes(query) ||
        note.email.toLowerCase().includes(query)
    );

    renderNotesTable(filteredNotes);
}

// --- MENTOR CARD LOGIC ---

function getUniqueExpertise() {
    const expertiseSet = new Set();
    mentorData.forEach(mentor => {
        mentor.expertise.forEach(exp => expertiseSet.add(exp));
    });
    return Array.from(expertiseSet).sort();
}

function setupExpertiseFilters() {
    const filterContainer = document.getElementById('expertise-filters');
    const expertise = getUniqueExpertise();

    expertise.forEach(exp => {
        const button = document.createElement('button');
        button.className = 'btn btn-small filter-btn';
        button.dataset.filter = exp.toLowerCase().replace(/\s/g, '-');
        button.textContent = exp;
        button.onclick = handleFilterClick;
        filterContainer.appendChild(button);
    });
}

function handleFilterClick(event) {
    // Update active filter state
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    activeFilter = event.target.dataset.filter;
    
    filterMentors();
}

function handleSortClick(event) {
    // Update active sort state
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    activeSort = event.target.dataset.sortBy;
    
    filterMentors(); // Re-sort and re-render
}


function sortMentors(mentors) {
    if (activeSort === 'rating') {
        mentors.sort((a, b) => b.rating - a.rating); // Highest rating first
    } else if (activeSort === 'sessions') {
        mentors.sort((a, b) => b.sessions - a.sessions); // Most sessions (Experience) first
    }
    return mentors;
}


function filterMentors() {
    const searchInput = document.getElementById('mentor-search-input').value.toLowerCase();
    
    let filtered = mentorData.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchInput) ||
                              mentor.role.toLowerCase().includes(searchInput) ||
                              mentor.expertise.some(exp => exp.toLowerCase().includes(searchInput));

        const matchesFilter = activeFilter === 'all' || 
                              mentor.expertise.map(exp => exp.toLowerCase().replace(/\s/g, '-')).includes(activeFilter);
                              
        return matchesSearch && matchesFilter;
    });

    currentMentors = sortMentors(filtered);
    renderMentorCards(currentMentors);
}


function renderMentorCards(mentors) {
    const container = document.getElementById('mentor-list');
    container.innerHTML = '';

    if (mentors.length === 0) {
        container.innerHTML = '<p class="text-center text-secondary p-5">No mentors found matching your criteria.</p>';
        return;
    }

    mentors.forEach(mentor => {
        const card = document.createElement('div');
        card.className = 'mentor-card';

        // Expertise Tags HTML
        const tagsHtml = mentor.expertise.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="mentor-profile">
                <div class="mentor-profile-pic" style="background-image: url('${mentor.image}')"></div>
                <div class="mentor-details">
                    <h4>${mentor.name}</h4>
                    <div class="mentor-rating">★ ${mentor.rating} <span>(${mentor.sessions} sessions)</span></div>
                </div>
            </div>
            <p class="mentor-description">${mentor.role}</p>
            <div class="mentor-expertise-tags">${tagsHtml}</div>
            
            <div class="mentor-footer">
                <p class="sessions-count">${mentor.sessions} sessions</p>
                <div>
                    <button class="btn btn-book">Book</button>
                    <button class="btn btn-message-icon">💬</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Notes Table Setup
    renderNotesTable(notesData);
    
    // 2. Mentor Section Setup
    setupExpertiseFilters();
    
    // Attach event listeners for sorting
    document.querySelectorAll('.sort-options .sort-btn').forEach(btn => {
        btn.onclick = handleSortClick;
    });

    // Initial render of mentor cards (default sort/filter)
    filterMentors(); 
});