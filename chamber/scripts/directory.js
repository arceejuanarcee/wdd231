document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const darkModeToggle = document.getElementById('darkModeToggle');
    const hambutton = document.getElementById('hambutton');
    const nav = document.getElementById('nav');
    const currentYearSpan = document.getElementById('currentYear');
    const lastModifiedSpan = document.getElementById('lastModified');
    const directory = document.getElementById('businessDirectory');
    const gridButton = document.getElementById('grid');
    const listButton = document.getElementById('list');

    // Set default view
    if (directory) {
        directory.classList.add('grid-view');
    }

    // Dark mode toggle
    darkModeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Mobile menu toggle
    hambutton?.addEventListener('click', () => {
        hambutton.classList.toggle('open');
        nav.classList.toggle('open');
    });

    // Set current year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Set last modified date
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Grid view button click handler
    gridButton?.addEventListener('click', () => {
        directory.classList.add('grid-view');
        directory.classList.remove('list-view');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    });

    // List view button click handler
    listButton?.addEventListener('click', () => {
        directory.classList.add('list-view');
        directory.classList.remove('grid-view');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    });

    // Fetch and display member data
    fetchMembersData();
});

// Fetch and display members from the JSON file
async function fetchMembersData() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        updateMembersUI(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        // Show error message to user
        const directory = document.getElementById('businessDirectory');
        directory.innerHTML = '<p class="error">Failed to load member data. Please try again later.</p>';
    }
}

// Function to update the UI with member data
function updateMembersUI(members) {
    const directory = document.getElementById('businessDirectory');
    directory.innerHTML = ''; // Clear existing data

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'memberCard';
        card.innerHTML = `
            <img src="./images/${member.image}" alt="${member.name}">
            <p class="member-name">${member.name}</p>
            <h3>Address: ${member.address}</h3>
            <h3>Phone: ${member.phone}</h3>
            <h3>Website: <a href="${member.website}" target="_blank">${member.website}</a></h3>
            <h3>Membership Level: ${getMembershipLevel(member.membershipLevel)}</h3>
            <h3>Info: ${member.info}</h3>
        `;
        directory.appendChild(card);
    });
}

// Function to get membership level based on numerical input
function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Unknown';
    }
}