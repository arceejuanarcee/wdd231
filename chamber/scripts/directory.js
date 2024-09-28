document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('nav');
    const currentYearSpan = document.getElementById('currentYear');
    const lastModifiedSpan = document.getElementById('lastModified');
    const viewToggle = document.getElementById('viewToggle'); // Button to toggle between grid/list views
    const directory = document.getElementById('businessDirectory');

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Set current year
    currentYearSpan.textContent = new Date().getFullYear();

    // Set last modified date
    lastModifiedSpan.textContent = document.lastModified;

    // Fetch and display member data
    fetchMembersData();

    // Toggle between grid and list views
    viewToggle.addEventListener('click', () => {
        directory.classList.toggle('grid-view');
    });
});

async function fetchMembersData() {
    try {
        const response = await fetch('./data/members.json');
        const members = await response.json();
        updateMembersUI(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function updateMembersUI(members) {
    const directory = document.getElementById('businessDirectory');
    directory.innerHTML = ''; // Clear existing data

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'memberCard';
        card.innerHTML = `
            <img src="./images/${member.image}" alt="${member.name}">
            <p>${member.name}</p>
            <h3>Address: ${member.address}</h3>
            <h3>Phone: ${member.phone}</h3>
            <h3>Website: <a href="${member.website}" target="_blank">${member.website}</a></h3>
            <h3>Membership Level: ${getMembershipLevel(member.membershipLevel)}</h3>
            <h3>Info: ${member.info}</h3>
        `;
        directory.appendChild(card);
    });
}

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
