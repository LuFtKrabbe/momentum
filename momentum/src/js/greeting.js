import {settingsLanguage} from '../js/settings.js';
import {settingsLanguageContainer} from '../js/settings.js';


const selectedGreeting = document.querySelector('.greeting');
const selectedName = document.querySelector('.name');

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
settingsLanguageContainer.addEventListener('change', languageGreeting);
settingsLanguageContainer.addEventListener('change', showGreeting);

function setLocalStorage() {
    localStorage.setItem('userName', selectedName.value);
}

function getLocalStorage() {
    if (localStorage.getItem('userName')) {
        selectedName.value = localStorage.getItem('userName');
    }
}

function languageGreeting() {
    if (settingsLanguage == "РУС") {selectedName.placeholder = '[Введите имя]'};
    if (settingsLanguage == "ENG") {selectedName.placeholder = '[Enter name]'};
}

languageGreeting();

function showGreeting() {
    const fullDate = new Date();
    const currentHour = fullDate.getHours();

    function getTimeOfDay() {
        let timeOfDay = Math.floor(currentHour / 6);
        let greetingOfTime = '';

        if (settingsLanguage == "РУС") {
            switch(timeOfDay) {
                case 0: // [0:00, 6:00)
                    greetingOfTime = 'Доброй ночи';
                break
                case 1: // [6:00, 12:00)
                    greetingOfTime = 'Доброе утро';
                break
                case 2: // [12:00, 18:00)
                    greetingOfTime = 'Добрый день';
                break
                case 3: // [18:00, 0:00)
                    greetingOfTime = 'Добрый вечер';
                break
            }
            return greetingOfTime;
        };

        if (settingsLanguage == "ENG") {
            switch(timeOfDay) {
                case 0: // [0:00, 6:00)
                    greetingOfTime = 'Good night';
                break
                case 1: // [6:00, 12:00)
                    greetingOfTime = 'Good morning';
                break
                case 2: // [12:00, 18:00)
                    greetingOfTime = 'Good day';
                break
                case 3: // [18:00, 0:00)
                    greetingOfTime = 'Good evening';
                break
            }
            return greetingOfTime;
        };
    }

    selectedGreeting.textContent = getTimeOfDay() + ',';

    setTimeout(showGreeting, 1000);
}

showGreeting();