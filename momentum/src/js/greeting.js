const selectedGreeting = document.querySelector('.greeting');

function showGreeting() {
    const fullDate = new Date();
    const currentHour = fullDate.getHours();

    function getTimeOfDay() {
        let timeOfDay = Math.floor(currentHour/6);
        let greetingOfTime = '';

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
    }

    selectedGreeting.textContent = getTimeOfDay() + ',';

    setTimeout(showGreeting, 1000);
}

showGreeting();





const selectedName = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('userName', selectedName.value);
}

function getLocalStorage() {
    if (localStorage.getItem('userName')) {
        selectedName.value = localStorage.getItem('userName');
    }
}

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);