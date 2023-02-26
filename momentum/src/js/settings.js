//All HTML Elements
export let settingsLanguage = getLocalStorage() ?? 'РУС';

export const settingsLanguageContainer = document.querySelector('.settings-language');
const RU = document.getElementById('ru');
const EN = document.getElementById('en');

const settingsTagsContainer = document.querySelector('.settings-tags-container');
const morning = document.getElementById('morning');
const afternoon = document.getElementById('afternoon');
const evening = document.getElementById('evening');
const night = document.getElementById('night');
const nature = document.getElementById('nature');

const settingsBlocksContainer = document.querySelector('.settings-blocks-container');
const time = document.getElementById('time');
const date = document.getElementById('date');
const greeting = document.getElementById('greeting');
const quote = document.getElementById('quote');
const weather = document.getElementById('weather');
const audio = document.getElementById('audio');
const todolist = document.getElementById('todolist');

//Settings block show

const buttonSettings = document.querySelector('.settings-app');
const settingsPanel = document.querySelector('.settings-container');

function showSettingsPanel() {
    settingsPanel.classList.toggle("settings-container-hidden");
}

buttonSettings.addEventListener('click', showSettingsPanel);

//Language

settingsLanguageContainer.addEventListener('change', switchLanguage);
settingsLanguageContainer.addEventListener('change', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', switchLanguage);
window.addEventListener('load', loadBlocks);
window.addEventListener('load', showBlocks);

function setLocalStorage(event) {
    if (event.target.id == 'ru') {localStorage.setItem('language', 'РУС')}
    if (event.target.id == 'en') {localStorage.setItem('language', 'ENG')}
}

function getLocalStorage() {
    if (localStorage.getItem('language')) {
        if (localStorage.getItem('language') == 'РУС') {document.getElementById('ru').checked = true};
        if (localStorage.getItem('language') == 'ENG') {document.getElementById('en').checked = true};
    }
}

function switchLanguage() {
    if (RU.checked) {
        settingsLanguage = 'РУС';
        morning.parentElement.children[1].textContent = 'Утро';
        afternoon.parentElement.children[1].textContent = 'День';
        evening.parentElement.children[1].textContent = 'Вечер';
        night.parentElement.children[1].textContent = 'Ночь';
        nature.parentElement.children[1].textContent = 'Природа';

        time.parentElement.children[1].textContent = 'Время';
        date.parentElement.children[1].textContent = 'Дата';
        greeting.parentElement.children[1].textContent = 'Приветствие';
        quote.parentElement.children[1].textContent = 'Цитата';
        weather.parentElement.children[1].textContent = 'Погода';
        audio.parentElement.children[1].textContent = 'Аудио';
        todolist.parentElement.children[1].textContent = 'Дела';
    }
    if (EN.checked) {
        settingsLanguage = 'ENG'
        morning.parentElement.children[1].textContent = 'Morning';
        afternoon.parentElement.children[1].textContent = 'Afternoon';
        evening.parentElement.children[1].textContent = 'Evening';
        night.parentElement.children[1].textContent = 'Night';
        nature.parentElement.children[1].textContent = 'Nature';

        time.parentElement.children[1].textContent = 'Time';
        date.parentElement.children[1].textContent = 'Date';
        greeting.parentElement.children[1].textContent = 'Greeting';
        quote.parentElement.children[1].textContent = 'Quote';
        weather.parentElement.children[1].textContent = 'Weather';
        audio.parentElement.children[1].textContent = 'Audio';
        todolist.parentElement.children[1].textContent = 'Todo';
    }
}

//Blocks

settingsBlocksContainer.addEventListener('change', showBlocks);

function showBlocks() {
    const selectTime = document.querySelector('.time');
    const selectDate = document.querySelector('.date');
    const selectGreeting = document.querySelector('.greeting-container');
    const selectQuote = document.querySelector('.quote');
    const selectQuoteIcon = document.querySelector('.change-quote');
    const selectAuthor = document.querySelector('.author');
    const selectWeather = document.querySelector('.weather');
    const selectPlayer = document.querySelector('.player');

    (time.checked == true) ? selectTime.classList.remove('time-hidden') : selectTime.classList.add('time-hidden');
    (date.checked == true) ? selectDate.classList.remove('date-hidden') : selectDate.classList.add('date-hidden');
    (greeting.checked == true) ? selectGreeting.classList.remove('greeting-hidden') : selectGreeting.classList.add('greeting-hidden');
    if (quote.checked == true) {
        selectQuote.classList.remove('quote-hidden');
        selectQuoteIcon.classList.remove('change-quote-hidden');
        selectAuthor.classList.remove('author-hidden');
    } else {
        selectQuote.classList.add('quote-hidden');
        selectQuoteIcon.classList.add('change-quote-hidden');
        selectAuthor.classList.add('author-hidden');
    }
    (weather.checked == true) ? selectWeather.classList.remove('weather-hidden') : selectWeather.classList.add('weather-hidden');
    (audio.checked == true) ? selectPlayer.classList.remove('player-hidden') : selectPlayer.classList.add('player-hidden');

    (time.checked == true) ? localStorage.setItem('timeBlock', true) : localStorage.setItem('timeBlock', false);
    (date.checked == true) ? localStorage.setItem('dateBlock', true) : localStorage.setItem('dateBlock', false);
    (greeting.checked == true) ? localStorage.setItem('greetingBlock', true) : localStorage.setItem('greetingBlock', false);
    (quote.checked == true) ? localStorage.setItem('quoteBlock', true) : localStorage.setItem('quoteBlock', false);
    (weather.checked == true) ? localStorage.setItem('weatherBlock', true) : localStorage.setItem('weatherBlock', false);
    (audio.checked == true) ? localStorage.setItem('audioBlock', true) : localStorage.setItem('audioBlock', false);
}

function loadBlocks() {

    let blocks = [time, date, greeting, quote, weather, audio];

    for (let i = 0; i < blocks.length; i++) {
        if (localStorage.getItem(blocks[i].id + 'Block') == 'false') {
            blocks[i].checked = false;
        }
    }    
}

 //const selectedTodolist = document.querySelector('.todolist');