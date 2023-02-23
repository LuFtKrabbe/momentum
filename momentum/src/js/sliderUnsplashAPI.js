const selectedBg = document.querySelector('body');

function getTimeOfDay() {
    const fullDate = new Date();
    const currentHour = fullDate.getHours();
    let timeOfDay = Math.floor(currentHour/6);

    switch(timeOfDay) {
        case 0: // [0:00, 6:00)
            timeOfDay = 'night';
        break
        case 1: // [6:00, 12:00)
            timeOfDay = 'morning';
        break
        case 2: // [12:00, 18:00)
            timeOfDay = 'afternoon';
        break
        case 3: // [18:00, 0:00)
            timeOfDay = 'evening';
        break
    }
    return timeOfDay;
}

async function setBg() {
    const img = new Image();

    let orientation = 'landscape';
    let query = getTimeOfDay();
    let key = 'sxWmpqDDGplK86BYiFL5wrtlk4do6Qpk7wlXjlvTx4I';

    let url = 'https://api.unsplash.com/photos/random?';
    let options = `orientation=${orientation}&query=${query}&client_id=${key}`;


    const response = await fetch(url + options);
    const data = await response.json();


    img.src = data.urls.regular;

    img.addEventListener('load', () => {
        selectedBg.style.backgroundImage = ("url(" + img.src + ")");
    })
}

setBg();


const selectedSlidePrev = document.querySelector('.slide-prev');
const selectedSlideNext = document.querySelector('.slide-next');

selectedSlidePrev.addEventListener('click', getSlidePrev);
selectedSlideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
    setBg();
}

function getSlideNext() {
    setBg();
}