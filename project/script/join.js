// join.js
document.addEventListener('DOMContentLoaded', function() {
    // Set the current timestamp
    document.getElementById('timestamp').value = new Date().toISOString();

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const infoLinks = document.querySelectorAll('.info-link');
    const closeButtons = document.querySelectorAll('.close-modal');

    function toggleModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    }

    infoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal(link.getAttribute('data-modal'));
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleModal(button.closest('.modal').id);
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Form validation
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            alert('Please fill out all required fields correctly.');
        }
    });

    // Integrated features from main.js
    const hambutton = document.getElementById('hambutton');
    const nav = document.querySelector('nav');
    const currentYearSpan = document.getElementById('currentYear');
    const lastModifiedSpan = document.getElementById('lastModified');

    // Mobile menu toggle
    hambutton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Set current year
    currentYearSpan.textContent = new Date().getFullYear();

    // Set last modified date
    lastModifiedSpan.textContent = document.lastModified;
});