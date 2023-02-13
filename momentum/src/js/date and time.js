const selectedTime = document.querySelector('.time');
const selectedDate = document.querySelector('.date');

function showTime() {
    const fullDate = new Date();
    const currentTime = fullDate.toLocaleTimeString('ru-RU');
    
    selectedTime.textContent = currentTime;

    setTimeout(showTime, 1000);
}

function showDate() {
    const fullDate = new Date();
    const options = {weekday: "long", month: "long", day: "numeric"};
    const currentDate = fullDate.toLocaleDateString('ru-Ru', options);
    
    selectedDate.textContent = currentDate;

    setTimeout(showDate, 1000);
}

showTime();
showDate();