const selectedTime = document.querySelector('.time');
const selectedDate = document.querySelector('.date');
const globalLanguage = document.querySelector('.global-language').textContent;

function showTime() {
    const fullDate = new Date();
    const currentTime = fullDate.toLocaleTimeString('ru-RU');
    
    selectedTime.textContent = currentTime;

    setTimeout(showTime, 1000);
}

function showDate() {
    let language = '';

    if (globalLanguage == "РУС") {language = 'ru-RU'};
    if (globalLanguage == "ENG") {language = 'en-EN'};

    const fullDate = new Date();
    const options = {weekday: "long", month: "long", day: "numeric"};
    const currentDate = fullDate.toLocaleDateString(language, options);
    
    selectedDate.textContent = currentDate;

    setTimeout(showDate, 1000);
}

showTime();
showDate();