document.addEventListener('DOMContentLoaded', function() {
    const hamButton = document.getElementById('hambutton');
    const mainNav = document.getElementById('main-nav');

    hamButton.addEventListener('click', function() {
        hamButton.classList.toggle('open');
        mainNav.classList.toggle('open');
}); 
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web...',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized...',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes...',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience...',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

let currentFilter = 'All';

// Filter courses based on the selected filter
function filterCourses(filter) {
    currentFilter = filter;
    renderCourses();
}

// Render the courses dynamically
function renderCourses() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';  // Clear current content

    const filteredCourses = courses.filter(course => 
        currentFilter === 'All' || course.subject === currentFilter
    );

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = `course-block ${course.completed ? 'completed' : 'incomplete'}`;
        courseElement.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
        `;
        courseList.appendChild(courseElement);
    });
}

// Update the total credits dynamically
function updateTotalCredits() {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = totalCredits;
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Filter buttons event listener
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterCourses(button.dataset.filter);
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    renderCourses();  // Initial rendering of the course list
    updateTotalCredits();  // Update the total credits
});
document.addEventListener('DOMContentLoaded', function() {
    // Update the year and last modified date in the footer
    const currentYearElement = document.getElementById('currentYear');
    const lastModifiedDateElement = document.getElementById('lastModifiedDate');

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        console.error('Current year element not found.');
    }

    if (lastModifiedDateElement) {
        lastModifiedDateElement.textContent = `Last Modified: ${document.lastModified}`;
    } else {
        console.error('Last modified date element not found.');
    }
});
