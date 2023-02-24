const settingsServerApiContainer = document.querySelector('.settings-server-api-container');
settingsServerApiContainer.addEventListener('change', switchApi);

const selectedBg = document.querySelector('body');
const img = new Image();
let randomNum = Math.floor(Math.random() * 20) + 1;

function switchApi() {
    if (document.getElementById('github').checked) {setBg()}
    if (document.getElementById('unsplash').checked) {setBgUnsplash()}
    if (document.getElementById('flickr').checked) {setBgFlickr()}
}

function getTimeOfDay() {
    const fullDate = new Date();
    const currentHour = fullDate.getHours();
    let timeOfDay = Math.floor(currentHour/6);
    let day = ['night', 'morning', 'afternoon', 'evening'];

    return day[timeOfDay];
}

function setBg() {
    const linkToBg = 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/assets/images';
    
    let bgNum = String(randomNum).padStart(2, '0');

    img.src = linkToBg + "/" + getTimeOfDay() + "/" + bgNum + ".jpg";
    img.addEventListener('load', () => {
        selectedBg.style.backgroundImage = ("url(" + img.src + ")");
    })
}

setBg();

async function setBgUnsplash() {
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

async function setBgFlickr() {
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

const selectedSlidePrev = document.querySelector('.slide-prev');
const selectedSlideNext = document.querySelector('.slide-next');

selectedSlidePrev.addEventListener('click', getSlidePrev);
selectedSlideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
    if (github.checked) {
        (randomNum == 1) ? (randomNum = 20) : (randomNum -= 1); 
        setBg();
    }
    if (unsplash.checked) {setBgUnsplash()}
    if (flickr.checked) {setBgFlickr()}
}

function getSlideNext() {
    if (github.checked) {
        (randomNum == 20) ? (randomNum = 1) : (randomNum += 1); 
        setBg();
    }
    if (unsplash.checked) {setBgUnsplash()}
    if (flickr.checked) {setBgFlickr()}
}