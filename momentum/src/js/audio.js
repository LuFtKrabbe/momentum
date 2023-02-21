const playList = [
    {      
        title: 'Aqua Caelestis',
        src: 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/momentum/assets/sounds/Aqua Caelestis.mp3',
        duration: '00:58'
    },  
    {      
        title: 'Ennio Morricone',
        src: 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/momentum/assets/sounds/Ennio Morricone.mp3',
        duration: '00:00'
    },
    {      
        title: 'River Flows In You',
        src: 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/momentum/assets/sounds/River Flows In You.mp3',
        duration: '03:50'
    },
    {      
        title: 'Summer Wind',
        src: 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/momentum/assets/sounds/Summer Wind.mp3',
        duration: '00:00'
    }, 
]

const audioPlayer = new Audio;
let playTrackNum = 0;

const playPrevButton = document.querySelector('.play-prev');
const playButton = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

playList.forEach (element => {
    const liTrack = document.createElement('li');
    liTrack.classList.add('play-item');
    liTrack.textContent = element.title;
    playListContainer.append(liTrack);
})

playPrevButton.addEventListener('click', playTrackPrev);
playButton.addEventListener('click', playAudio);
playNextButton.addEventListener('click', playTrackNext);
audioPlayer.addEventListener('ended', playTrackNext);

function playTrackPrev() {
    playListContainer.children[playTrackNum].classList.remove('item-active');

    if (playTrackNum == 0) {
        playTrackNum = playList.length - 1;
    } else {
        playTrackNum -= 1; 
    }

    if (isPlay()) {
        playAudio();
        playAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    if (isPlay()) {
        playButton.classList.remove('pause');
        playListContainer.children[playTrackNum].classList.remove('item-active');
        audioPlayer.pause()
    } else {
        playButton.classList.add('pause');
        playListContainer.children[playTrackNum].classList.add('item-active');
        console.log(playListContainer.children[playTrackNum]);
        audioPlayer.src = playList[playTrackNum].src;
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    }
}

function playTrackNext() {
    playListContainer.children[playTrackNum].classList.remove('item-active');

    if (playTrackNum == playList.length - 1) {
        playTrackNum = 0;
    } else {
        playTrackNum += 1; 
    }

    if (isPlay()) {
        playAudio();
        playAudio();
    } else {
        playAudio();
    }
}

function isPlay() {
    return playButton.classList.contains('pause');
}