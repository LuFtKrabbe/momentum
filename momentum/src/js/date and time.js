import {settingsLanguage} from '../js/settings.js';
import {settingsLanguageContainer} from '../js/settings.js';


settingsLanguageContainer.addEventListener('change', showDate);
window.addEventListener('load', showDate);
window.addEventListener('load', showTime);

const selectedTime = document.querySelector('.time');
const selectedDate = document.querySelector('.date');

function showTime() {
    const fullDate = new Date();
    const currentTime = fullDate.toLocaleTimeString('ru-RU');
    
    selectedTime.textContent = currentTime;

    setTimeout(showTime, 1000);
}

function showDate() {
    let language = '';

    if (settingsLanguage == "РУС") {language = 'ru-RU'};
    if (settingsLanguage == "ENG") {language = 'en-EN'};

    const fullDate = new Date();
    const options = {weekday: "long", month: "long", day: "numeric"};
    
    const currentDate = fullDate.toLocaleDateString(language, options);
    
    selectedDate.textContent = currentDate;

    setTimeout(showDate, 1000);
}