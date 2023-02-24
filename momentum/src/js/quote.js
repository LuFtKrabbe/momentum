import {settingsLanguage} from '../js/settings.js';
import {settingsLanguageContainer} from '../js/settings.js';

const quoteQuote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const quoteIcon = document.querySelector('.change-quote');

quoteIcon.addEventListener('click', getQuotes);
settingsLanguageContainer.addEventListener('change', getQuotes);
window.addEventListener('load', getQuotes);

async function getQuotes() {  
    let quotes = '';

    if (settingsLanguage == "РУС") {quotes = 'src/data.json'};
    if (settingsLanguage == "ENG") {quotes = 'src/dataEng.json'};

    const response = await fetch(quotes);
    const data = await response.json();

    let randomNum = Math.floor(Math.random()*data.length);
    let randomNum2 = Math.floor(Math.random()*data.length);
    
    if (localStorage.getItem('quoteNumber')) {
        randomNum = localStorage.getItem('quoteNumber');
        while (randomNum == randomNum2) {
            randomNum2 = Math.floor(Math.random()*data.length);
        }
        randomNum = randomNum2;
        localStorage.setItem('quoteNumber', randomNum);
    } else {
        localStorage.setItem('quoteNumber', randomNum);
    }

    quoteQuote.textContent = data[randomNum]["text"];
    quoteAuthor.textContent = data[randomNum]["author"];
}