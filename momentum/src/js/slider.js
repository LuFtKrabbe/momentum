const settingsServerApiContainer = document.querySelector('.settings-server-api-container');
const settingsTagsContainer = document.querySelector('.settings-tags-container');
const selectedBg = document.querySelector('body');
const img = new Image();
let randomNum = Math.floor(Math.random() * 20) + 1;

settingsServerApiContainer.addEventListener('change', switchApi);
settingsServerApiContainer.addEventListener('change', setLocalStorage);

settingsTagsContainer.addEventListener('change', checkTags);
settingsTagsContainer.addEventListener('change', switchApi);

window.addEventListener('load', getLocalStorage);
window.addEventListener('load', loadTags);
window.addEventListener('load', switchApi);



function setLocalStorage(event) {
    localStorage.setItem('imgReceiving', event.target.id);
}

function getLocalStorage() {
    if (localStorage.getItem('imgReceiving')) {
        document.getElementById(localStorage.getItem('imgReceiving')).checked = true;
    }
}

function checkTags() {
    const morning = document.getElementById('morning');
    const afternoon = document.getElementById('afternoon');
    const evening = document.getElementById('evening');
    const night = document.getElementById('night');
    const nature = document.getElementById('nature');


    let searchTags = [];
    let tags = [morning, afternoon, evening, night, nature];

    for (let i = 0; i < tags.length; i++) {
        if (tags[i].checked == true) {
            searchTags.push(tags[i].id);
            localStorage.setItem(tags[i].id + 'Tag', true);
        } else {
            localStorage.setItem(tags[i].id + 'Tag', false);
        }
    }

    console.log(searchTags);
    return searchTags;
}

function loadTags() {
    const morning = document.getElementById('morning');
    const afternoon = document.getElementById('afternoon');
    const evening = document.getElementById('evening');
    const night = document.getElementById('night');
    const nature = document.getElementById('nature');

    let tags = [morning, afternoon, evening, night, nature];

    for (let i = 0; i < tags.length; i++) {
        if (localStorage.getItem(tags[i].id + 'Tag') == 'false') {
            tags[i].checked = false;
        }
    }    
}

function switchApi() {
    if (document.getElementById('github').checked) {
        setBg();
        settingsTagsContainer.classList.add('tags-hidden');
    }
    if (document.getElementById('unsplash').checked) {
        setBgUnsplash();
        settingsTagsContainer.classList.remove('tags-hidden');
    }
    if (document.getElementById('flickr').checked) {
        setBgFlickr();
        settingsTagsContainer.classList.remove('tags-hidden');
    }
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

async function setBgUnsplash() {
    let tags = checkTags();
    if (tags.length == 0) {tags = ['meal']};
    let randomTag = Math.floor(Math.random()*tags.length);
    console.log(tags[randomTag]);
    
    let orientation = 'landscape';
    let query = tags[randomTag];
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
    let tags = checkTags();
    if (tags.length == 0) {tags = ['meal']};
    let randomTag = Math.floor(Math.random()*tags.length);
    let query = tags[randomTag];
    console.log(tags[randomTag]);

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