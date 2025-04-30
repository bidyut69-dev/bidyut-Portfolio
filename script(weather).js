// OpenWeather API Key - Replace with your own API key
const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const forecastContainer = document.getElementById('forecast-container');

// Event Listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});

// Get weather data
async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        // Get current weather
        const currentWeather = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const currentData = await currentWeather.json();

        if (currentData.cod === '404') {
            alert('City not found');
            return;
        }

        // Update current weather UI
        updateCurrentWeather(currentData);

        // Get forecast
        const forecast = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
        const forecastData = await forecast.json();
        updateForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Update current weather UI
function updateCurrentWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = Math.round(data.main.temp);
    humidity.textContent = data.main.humidity;
    wind.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
}

// Update forecast UI
function updateForecast(data) {
    forecastContainer.innerHTML = '';
    
    // Get unique days (every 8th item as API returns 3-hour intervals)
    const dailyForecast = data.list.filter((item, index) => index % 8 === 0);

    dailyForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="day">${dayName}</div>
            <div class="temp">${Math.round(day.main.temp)}°C</div>
            <div class="description">${day.weather[0].description}</div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// Initialize with default city
window.addEventListener('load', () => {
    cityInput.value = 'London';
    getWeather();
}); 