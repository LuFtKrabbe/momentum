const selectedBg = document.querySelector('body');
const linkToBg = 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/assets/images';

let randomNum = getRandomNum();

function getRandomNum() {
    return (Math.floor(Math.random() * 20) + 1);
}

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

function setBg() {
    const img = new Image();

    let timeOfDay = getTimeOfDay();
    let bgNum = String(randomNum).padStart(2, '0');

    img.src = linkToBg + "/" + timeOfDay + "/" + bgNum + ".jpg";

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
    if (randomNum == 1) {
        randomNum = 20;
    } else {
        randomNum -= 1; 
    }
    setBg();
}

function getSlideNext() {
    if (randomNum == 20) {
        randomNum = 1;
    } else {
        randomNum += 1; 
    }
    setBg();
}