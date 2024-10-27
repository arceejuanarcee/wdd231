document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const hambutton = document.getElementById('hambutton');
    const nav = document.querySelector('nav');
    const currentYearSpan = document.getElementById('currentYear');
    const lastModifiedSpan = document.getElementById('lastModified');
    const directory = document.getElementById('businessDirectory');
    
    console.log("Page initialized...");

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

    // Fetch and display weather data using OpenWeatherMap API
    apiFetch();  // Fetch current weather
    fetchWeatherForecast();  // Fetch weather forecast

    // Fetch and display random Gold and Silver members from the members.json
    fetchMembersData();  // Fetch and display members

});

// Fetch and display members from the JSON file
async function fetchMembersData() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displayFilteredMembers(members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// Function to display only 3 random Gold and Silver members in the UI
function displayFilteredMembers(members) {
    const directory = document.getElementById('businessDirectory');
    directory.innerHTML = ''; // Clear existing data

    // Filter to get only Gold (3) and Silver (2) members
    const filteredMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

    // Select 3 random members from the filtered list
    const randomMembers = getRandomMembers(filteredMembers, 3);

    // Display the selected random members
    randomMembers.forEach(member => {
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

// Function to get a random selection of members (limit to a specified count)
function getRandomMembers(members, count) {
    // Shuffle the array and return the first 'count' members
    const shuffled = members.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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

// Fetch and display weather data
const currentTemp = document.getElementById('temperature');
const description = document.getElementById('description');
const highLow = document.getElementById('highLow');
const humidity = document.getElementById('humidity');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const forecastList = document.getElementById('forecast');

// Current Weather API URL
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=7.084561015770142&lon=125.5704672542671&units=metric&appid=da6de4a03488bd9eb2df35286a9d66c0'; // Replace with your valid API key

// 5 day / 3 hour forecast API URL
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=7.084561015770142&lon=125.5704672542671&units=metric&appid=da6de4a03488bd9eb2df35286a9d66c0'; // Replace with your valid API key

// Fetch current weather
async function apiFetch() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            console.log("Current weather data:", data);
            displayCurrentWeather(data);  
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Display current weather
function displayCurrentWeather(data) {
    if (!data || !data.main) {
        console.error("No weather data to display");
        return;
    }

    currentTemp.innerHTML = `${data.main.temp}°C`;
    description.textContent = `${data.weather[0].description}`;
    highLow.textContent = `High: ${data.main.temp_max}°C | Low: ${data.main.temp_min}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    sunrise.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunset.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
}

// Fetch the 5-day / 3-hour weather forecast
async function fetchWeatherForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log("Fetched forecast data:", data);
            displayThreeDayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}

// Function to display the 3-day weather forecast
function displayThreeDayForecast(data) {
    if (!data || !data.list) {
        console.error("No forecast data to display");
        return;
    }

    forecastList.innerHTML = '';  // Clear previous forecast

    // Display the first 3 forecast entries
    const filteredForecast = data.list.slice(0, 3);

    filteredForecast.forEach(day => {
        const li = document.createElement('li');
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const forecastTemp = `${day.main.temp}°C`;
        const forecastDesc = day.weather[0].description;
        console.log(`Date: ${date}, Temp: ${forecastTemp}, Description: ${forecastDesc}`);
        li.textContent = `${date}: ${forecastTemp}, ${forecastDesc}`;
        forecastList.appendChild(li);
    });
}
