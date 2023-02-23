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

    let query = getTimeOfDay();
    let key = 'f0b800bbf9777fa04c11bd5d8160cdca';
    let bigPhotos = 'url_l';

    let url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    let options = `&api_key=${key}&tags=${query}&extras=${bigPhotos}&format=json&nojsoncallback=1`;

    const response = await fetch(url + options);
    const data = await response.json();
    let randomImage = Math.floor(Math.random() * 100);

    img.src = data.photos.photo[randomImage].url_l;

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