import {settingsLanguage} from '../js/settings.js';
import {settingsLanguageContainer} from '../js/settings.js';

const weatherIcon = document.querySelector('.weather-icon');
const weatherTemperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const weatherCity = document.querySelector('.city');

window.addEventListener('beforeunload', setWeatherCityLocalStorage);
window.addEventListener('load', getWeatherCityLocalStorage);
weatherCity.addEventListener('change', getWeather);
settingsLanguageContainer.addEventListener('change', getWeather);

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
    if (settingsLanguage == "РУС") {weatherCity.value = 'Минск'};
    if (settingsLanguage == "ENG") {weatherCity.value = 'Minsk'};
}

async function getWeather() {
    
    let city = `${weatherCity.value}`;
    let lang = '';
    let key = 'b7fa1d88682ed0bba42eee4bcdafb0d1';
    let units = 'metric';

    if (settingsLanguage == "РУС") {lang = 'ru'};
    if (settingsLanguage == "ENG") {lang = 'en'};

    let url = 'https://api.openweathermap.org/data/2.5/weather?';
    let options = `q=${city}&lang=${lang}&appid=${key}&units=${units}`;

    let response = await fetch(url + options);
    let data = await response.json();

    if (response.ok) {
        weatherIcon.className = 'weather-icon owf';
    } else {
        if (settingsLanguage == "РУС") {
            alert('Населенный пункт не найден или в названии допущена ошибка');
        }
        if (settingsLanguage == "ENG") {
            alert('Location not found or name misspelled');
        }
        weatherCity.value = localStorage.getItem('userCity');
    }

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherTemperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;

    if (settingsLanguage == "РУС") {
        weatherWind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
        weatherHumidity.textContent = `Влажность: ${data.main.humidity}%`;
    }

    if (settingsLanguage == "ENG") {
        weatherWind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    }

    setWeatherCityLocalStorage();
}

getWeather();