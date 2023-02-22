const weatherIcon = document.querySelector('.weather-icon');
const weatherTemperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherCity = document.querySelector('.city');

const globalLanguage = document.querySelector('.global-language').textContent;

window.addEventListener('beforeunload', setWeatherCityLocalStorage);
window.addEventListener('load', getWeatherCityLocalStorage);
weatherCity.addEventListener('change', getWeather);

function setWeatherCityLocalStorage() {
    localStorage.setItem('userCity', weatherCity.value);
}

function getWeatherCityLocalStorage() {
    if (localStorage.getItem('userCity')) {
        weatherCity.value = localStorage.getItem('userCity');
    }
}

if (localStorage.getItem('userCity')) {
    weatherCity.value = localStorage.getItem('userCity');
} else {
    if (globalLanguage == "РУС") {weatherCity.value = 'Минск'};
    if (globalLanguage == "ENG") {weatherCity.value = 'Minsk'};
}

async function getWeather() {
    
    let city = `${weatherCity.value}`;
    let lang = 'ru';
    let key = 'b7fa1d88682ed0bba42eee4bcdafb0d1';
    let units = 'metric';

    if (globalLanguage == "РУС") {lang = 'ru'};
    if (globalLanguage == "ENG") {lang = 'en'};

    let url = 'https://api.openweathermap.org/data/2.5/weather?';
    let options = `q=${city}&lang=${lang}&appid=${key}&units=${units}`;

    const response = await fetch(url + options);
    const data = await response.json();

    try {
        if (!response.ok) {throw new Error()}
        weatherIcon.className = 'weather-icon owf';
    } catch (error) {
        alert('Населенный пункт не найден или в названии допущена ошибка');
        weatherCity.value = localStorage.getItem('userCity');
    }

    setWeatherCityLocalStorage();

    if (globalLanguage == "РУС") {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherTemperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherWind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
        weatherHumidity.textContent = `Влажность: ${data.main.humidity}%`;
    }

    if (globalLanguage == "ENG") {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherTemperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherWind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    }
}

getWeather();