const playList = [
    {      
        title: 'Aqua Caelestis',
        src: 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/momentum/assets/sounds/Aqua Caelestis.mp3',
        duration: '0:39',
        track: '0',
    },  
    {      
        title: 'Ennio Morricone',
        src: 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/momentum/assets/sounds/Ennio Morricone.mp3',
        duration: '1:37',
        track: '1',
    },
    {      
        title: 'River Flows In You',
        src: 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/momentum/assets/sounds/River Flows In You.mp3',
        duration: '1:37',
        track: '2',
    },
    {      
        title: 'Summer Wind',
        src: 'https://raw.githubusercontent.com/LuFtKrabbe/stage1-tasks/momentum/assets/sounds/Summer Wind.mp3',
        duration: '1:50',
        track: '3',
    }, 
]

const audioPlayer = new Audio;

const playPrevButton = document.querySelector('.play-prev');
const playButton = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const playMusicName = document.querySelector('.player-music-name');
const playMusicDuration = document.querySelector('.player-music-time-length');
const playTimeline = document.querySelector('.player-timeline');
const playProgress = document.querySelector('.player-progress');
const playMusicCurrentTime = document.querySelector('.player-music-time-current');
const playVolumeSlider = document.querySelector('.player-volume-slider');
const playVolumePercentage = document.querySelector('.player-volume-percentage');
const playVolumeButton = document.querySelector('.player-volume-button');
const playVolumeIcon = document.querySelector('.player-volume');

let progressId = 0;
let playTrackNum = 0;
audioPlayer.volume = 0.75;

playList.forEach (element => {
    const liTrack = document.createElement('li');
    liTrack.classList.add('play-item');
    liTrack.textContent = element.title;
    playListContainer.append(liTrack);
})

const playTrackPlayButton = document.querySelector('ul');

playPrevButton.addEventListener('click', playTrackPrev);
playButton.addEventListener('click', playAudio);
playNextButton.addEventListener('click', playTrackNext);
audioPlayer.addEventListener('ended', playTrackNext);
playTimeline.addEventListener("click", setMusicTime);
playVolumeSlider.addEventListener("click", setMusicVolume);
playVolumeButton.addEventListener("click", switchOnOffMusic);
//playTrackPlayButton.addEventListener("click", playCurrentTrack);

function playTrackPrev() {
    playListContainer.children[playTrackNum].classList.remove('item-active');
    getMusicNameAndDuration();

    if (playTrackNum == 0) {
        playTrackNum = playList.length - 1;
    } else {
        playTrackNum -= 1; 
    }

    if (isPlay()) {
        audioPlayer.currentTime = 0;
        audioPlayer.src = playList[playTrackNum].src;
        playAudio();
        playAudio();
    } else {
        audioPlayer.currentTime = 0;
        audioPlayer.src = playList[playTrackNum].src;
        playAudio();
    }
}

function playAudio() {
    
    if (isPlay()) {
        playButton.classList.remove('pause');
        playListContainer.children[playTrackNum].classList.remove('item-active');
        audioPlayer.pause();
        clearInterval(progressId);
    } else {
        getMusicNameAndDuration();
        playButton.classList.add('pause');
        playListContainer.children[playTrackNum].classList.add('item-active');
        if (!audioPlayer.src) {audioPlayer.src = playList[playTrackNum].src}
        audioPlayer.play();
        progressId = setInterval(showProgress, 200);
    }
}

function playTrackNext() {
    getMusicNameAndDuration();
    playListContainer.children[playTrackNum].classList.remove('item-active');

    if (playTrackNum == playList.length - 1) {
        playTrackNum = 0;
    } else {
        playTrackNum += 1; 
    }

    if (isPlay()) {
        audioPlayer.currentTime = 0;
        audioPlayer.src = playList[playTrackNum].src;
        playAudio();
        playAudio();
    } else {
        audioPlayer.currentTime = 0;
        audioPlayer.src = playList[playTrackNum].src;
        playAudio();
    }
}

function isPlay() {
    return playButton.classList.contains('pause');
}

function getMusicNameAndDuration() {
    playMusicDuration.textContent = playList[playTrackNum].duration;
    playMusicName.textContent = playList[playTrackNum].title;
}

function changeMusicNameAndDuration() {
    playMusicDuration.textContent = playList[playTrackNum].duration;
    playMusicName.textContent = playList[playTrackNum].title;
}

function setMusicTime(event) {
    const playTimelineWidth = window.getComputedStyle(playTimeline).width;
    const timeToSeek = event.offsetX / parseInt(playTimelineWidth, 10) * audioPlayer.duration;
    audioPlayer.currentTime = timeToSeek;
    showProgress();
}

function showProgress() {
    playProgress.style.width = (audioPlayer.currentTime / audioPlayer.duration) * 100 + '%';
    playMusicCurrentTime.textContent = getTimeCodeFromNum(audioPlayer.currentTime);
    console.log(audioPlayer.currentTime);
}

function getTimeCodeFromNum(num) {
    let minutes = parseInt((num / 60), 10);
    let seconds = parseInt((num - (minutes * 60)), 10);

    return `${minutes}:${String(seconds).padStart(2, 0)}`;
}

function setMusicVolume(event) {
    const playVolumeSliderWidth = window.getComputedStyle(playVolumeSlider).width;
    const volumeToSeek = event.offsetX / parseInt(playVolumeSliderWidth, 10);
    audioPlayer.volume = volumeToSeek;
    playVolumePercentage.style.width = (audioPlayer.volume * 100) + '%';
}

function switchOnOffMusic() {
    if (!audioPlayer.muted) {
        audioPlayer.muted = true;
        playVolumeIcon.classList.remove('icon-volume-medium');
        playVolumeIcon.classList.add('icon-volume-none');
    } else {
        playVolumeIcon.classList.remove('icon-volume-none');
        playVolumeIcon.classList.add('icon-volume-medium');
        audioPlayer.muted = false;
    }
}

/*function playCurrentTrack(event) {
    let musicName = event.target.textContent;
    playList.forEach(element => {
        if (musicName == element.title) {
            audioPlayer.currentTime = 0;
            audioPlayer.src = playList[element.track].src;
            playAudio();
        }
    })
}*/