//All HTML Elements
export let settingsLanguage = 'ENG';

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

function switchLanguage() {
    if (RU.checked) {settingsLanguage = 'РУС'}
    if (EN.checked) {settingsLanguage = 'ENG'}
}

settingsLanguageContainer.addEventListener('click', switchLanguage);

//Background image