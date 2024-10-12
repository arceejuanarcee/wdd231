// thankyou.js
document.addEventListener('DOMContentLoaded', function() {
    const submittedInfo = document.getElementById('submittedInfo');
    const urlParams = new URLSearchParams(window.location.search);

    // Array of required fields
    const requiredFields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Mobile Number' },
        { name: 'businessName', label: 'Business Name' },
        { name: 'timestamp', label: 'Submission Date' }
    ];

    // Display submitted information
    requiredFields.forEach(field => {
        const value = urlParams.get(field.name);
        if (value) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${field.label}:</strong> ${value}`;
            submittedInfo.appendChild(li);
        }
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Set last modified date in footer
    document.getElementById('lastModified').textContent = document.lastModified;

    // Mobile menu toggle
    const hambutton = document.getElementById('hambutton');
    const nav = document.querySelector('nav');
    hambutton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});