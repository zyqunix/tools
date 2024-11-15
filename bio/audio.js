const songs = [
    { 
        title: "Bladee & Ecco2k - Bleach", 
        src: "https://easyfiles.cc/2024/9/4ac37ab2-20d7-4fd8-863b-3dcee1c418cd/BLADEE%20&%20ECCO2K%20-%20BLEACH%20-%20drain%20gang%20(720p50,%20h264)(1).mp4" ,
        duration: 153
    },

    { 
        title: "woody - Heaven & Hell", 
        src: "https://easyfiles.cc/2024/9/20fa08a2-8212-4212-93b7-9c62fc563505/woody%20heaven%20&%20hell%20prod.%201mint%20-%20real1woody%20(1080p,%20h264)(1).mp4" ,
        duration: 142
    },


    { 
        title: "woody - God Said I Was Good", 
        src: "https://easyfiles.cc/2024/8/9cafa851-0405-4009-b639-08ff5e029dc3/youtube_Z4IF2ujq1Xk_1280x720_h264(1).mp4" ,
        duration: 135
    },

    {
        title: "SmokeTeam6 - PackistanFlashback", 
        src: "file:///C:/Users/Fabio/Downloads/SmokeTeam6%20-%20PackistanFlashback%20(VEVO%20Official%20Music%20Video)%20-%20benwbush%20(1080p,%20h264)(1).mp4" ,
        duration: 92
    },

    { 
        title: "sniper2004 - la ny", 
        src: "https://easyfiles.cc/2024/8/b8332c2a-e70b-4ec0-9ba8-acc7e5449db7/youtube_mkmn3QZSZUM_874x720_h264(1).mp4" ,
        duration: 87
    },

    { 
        title: "Joeyy - PR Package", 
        src: "https://easyfiles.cc/2024/8/7c649f45-6573-4665-9675-4d869ea1332a/youtube_ZvphwrKo52s_1280x720_h264(1).mp4" ,
        duration: 111
    },

    { 
        title: "woody - Paint Thinner", 
        src: "https://easyfiles.cc/2024/8/2110cfc6-d700-4c42-bc66-bafa5799c1fc/youtube_rhaFMuU1_qw_1280x720_h264(1).mp4" ,
        duration: 100
    },

];

let currentSongIndex = 0;
let isPlaying = false;

const main = document.getElementById("player")
const videoPlayer = document.getElementById("videoPlayer");
const playPauseButton = document.getElementById("playPause");
const songInfo = document.getElementById("songInfo");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById('volumeSlider');
const volumePercent = document.getElementById('volumePercent')
const currentDuration = document.getElementById("current-duration");
const totalDuration = document.getElementById("total-duration");

videoPlayer.addEventListener("timeupdate", () => {
    let value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.value = value;
    updateSliderBackground(progressBar, value);
    currentDuration.innerText = formatTime(videoPlayer.currentTime);
    totalDuration.innerText = formatTime(songs[currentSongIndex].duration);
});

progressBar.addEventListener('wheel', function (event) {
    event.preventDefault();
});

document.getElementById("prev").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        videoPlayer.play();
    }
});

document.getElementById("next").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        videoPlayer.play();
    }
});

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        videoPlayer.pause();
        playPauseButton.innerHTML = "&#9658;";
    } else {
        videoPlayer.play();
        playPauseButton.innerHTML = "&#10074;&#10074;";
    }
    isPlaying =!isPlaying;
});

videoPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    videoPlayer.play();
});

function updateSliderBackground(slider, value) {
    slider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${value}%, #cbcbcb ${value}%, #cbcbcb 100%)`;
}

function loadSong(index) {
    videoPlayer.src = songs[index].src;
    songInfo.innerText = songs[index].title;
    progressBar.value = 0;
    totalDuration.innerText = formatTime(songs[index].duration);
    videoPlayer.load();
    videoPlayer.play();
}

videoPlayer.volume = volumeSlider.value / 100;
volumePercent.innerText = `${volumeSlider.value}%`;
updateVolumeSliderBackground(volumeSlider, volumeSlider.value);

volumeSlider.addEventListener('input', function () {
    videoPlayer.volume = volumeSlider.value / 100;
    volumePercent.innerText = `${volumeSlider.value}%`;
    updateVolumeSliderBackground(volumeSlider, volumeSlider.value);
});

function updateVolumeSliderBackground(slider, value) {
    slider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${value}%, #cbcbcb ${value}%, #cbcbcb 100%)`;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

loadSong(0);