// =========================
// OpenWeather API Settings
// =========================

// Replace this with your OpenWeather API key.
const API_KEY = "YOUR_OPENWEATHER_API_KEY";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";


// =========================
// HTML Elements
// =========================

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");

const cityName = document.getElementById("cityName");
const country = document.getElementById("country");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");


// =========================
// Get Weather Data
// =========================

async function getWeather(city) {

    // Clear previous message
    message.textContent = "Loading...";

    try {

        // Create API URL
        const url =
            `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        // Request weather data
        const response = await fetch(url);

        // Check if city/API request failed
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found");
            }

            throw new Error("Unable to get weather data");
        }

        // Convert response to JSON
        const data = await response.json();

        // Display weather information
        displayWeather(data);

        // Clear message
        message.textContent = "";

    } catch (error) {

        console.error(error);

        if (error.message === "City not found") {
            message.textContent =
                "City not found. Please try again.";
        } else {
            message.textContent =
                "Unable to load weather. Please check your connection.";
        }
    }
}


// =========================
// Display Weather
// =========================

function displayWeather(data) {

    // Location
    cityName.textContent = data.name;
    country.textContent = data.sys.country;

    // Temperature
    temperature.textContent =
        Math.round(data.main.temp);

    // Weather condition
    condition.textContent =
        data.weather[0].description;

    // Weather icon
    const iconCode = data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherIcon.alt =
        data.weather[0].description;

    // Weather details
    humidity.textContent =
        `${data.main.humidity}%`;

    windSpeed.textContent =
        `${data.wind.speed} m/s`;

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;
}


// =========================
// Search Form
// =========================

searchForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    const city = cityInput.value.trim();

    // Don't search empty input
    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});


// =========================
// Default Weather
// =========================

// Load weather for Thiruvananthapuram
// when the app first opens.
getWeather("Thiruvananthapuram");