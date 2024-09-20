const courses = [
    { code: "CSE 110", name: "Programming Building Blocks", credits: 3, completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 3, completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: false },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD 131", name: "Web Frontend Development I", credits: 3, completed: false },
    { code: "WDD 231", name: "Web Frontend Development II", credits: 3, completed: false }
];

let currentFilter = 'All';

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
}

function filterCourses(filter) {
    currentFilter = filter;
    renderCourses();
}

function renderCourses() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';

    const filteredCourses = courses.filter(course => 
        currentFilter === 'All' || course.code.startsWith(currentFilter)
    );

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = `p-4 rounded-lg ${course.completed ? 'bg-brown-500' : 'bg-blue-600'}`;
        courseElement.innerHTML = `
            <h3 class="font-bold">${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
            ${course.completed ? '<p class="text-green-300">Completed</p>' : ''}
        `;
        courseList.appendChild(courseElement);
    });
}

function updateTotalCredits() {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = totalCredits;
}

function updateFooter() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last Update: ${document.lastModified}`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mobileMenuButton').addEventListener('click', toggleMobileMenu);

    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterCourses(button.dataset.filter);
            filterButtons.forEach(btn => btn.classList.remove('bg-blue-500'));
            button.classList.add('bg-blue-500');
        });
    });

    renderCourses();
    updateTotalCredits();
    updateFooter();
});