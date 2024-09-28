document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const hambutton = document.getElementById('hambutton');
    const nav = document.querySelector('nav');
    const currentYearSpan = document.getElementById('currentYear');
    const lastModifiedSpan = document.getElementById('lastModified');
    const directory = document.getElementById('businessDirectory');
    const gridButton = document.getElementById('grid');  // Button to switch to grid view
    const listButton = document.getElementById('list');  // Button to switch to list view

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Mobile menu toggle
    hambutton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Set current year
    currentYearSpan.textContent = new Date().getFullYear();

    // Set last modified date
    lastModifiedSpan.textContent = document.lastModified;

    // Fetch and display member data
    fetchMembersData();

    // Fetch and populate events
    populateEvents();

    // Fetch and display weather data
    fetchWeatherData();

    // Toggle between grid and list views for the businessDirectory only
    gridButton.addEventListener('click', () => {
        directory.classList.add('grid-view');
        directory.classList.remove('list-view');
    });

    listButton.addEventListener('click', () => {
        directory.classList.add('list-view');
        directory.classList.remove('grid-view');
    });
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

// Populate the events list
function populateEvents() {
    const events = [
        'Annual Business Meetup - Jan 20, 2024',
        'Chamber Awards Night - Feb 15, 2024',
        'Local Tech Expo - Mar 12, 2024'
    ];

    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // Clear existing data

    events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = event;
        eventList.appendChild(li);
    });
}

// Fetch and display weather data
function fetchWeatherData() {
    // Simulated weather data
    const weatherData = {
        current: {
            temp: 75,
            description: 'Partly Cloudy',
            high: 85,
            low: 52,
            humidity: 34,
            sunrise: '7:30am',
            sunset: '9:59pm'
        },
        forecast: [
            { day: 'Today', temp: 90 },
            { day: 'Wednesday', temp: 89 },
            { day: 'Thursday', temp: 68 }
        ]
    };

    updateWeatherUI(weatherData);
}

// Update the weather UI with fetched data
function updateWeatherUI(data) {
    document.getElementById('temperature').textContent = `${data.current.temp}°F`;
    document.getElementById('description').textContent = data.current.description;
    document.getElementById('highLow').textContent = `High: ${data.current.high}° | Low: ${data.current.low}°`;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('sunrise').textContent = `Sunrise: ${data.current.sunrise}`;
    document.getElementById('sunset').textContent = `Sunset: ${data.current.sunset}`;

    const forecastList = document.getElementById('forecast');
    forecastList.innerHTML = ''; // Clear existing data

    data.forecast.forEach(day => {
        const li = document.createElement('li');
        li.textContent = `${day.day}: ${day.temp}°F`;
        forecastList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const hamButton = document.getElementById('hambutton');
    const mainNav = document.getElementById('nav');

    hamButton.addEventListener('click', function() {
        hamButton.classList.toggle('open');
        mainNav.classList.toggle('open');
    });
});
