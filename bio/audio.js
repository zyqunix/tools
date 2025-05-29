const songs = [
    {
        song: "Tenkay - Jerry Springer Based Freestyle",
        src: "https://atums.world/raw/2025-05-08_22%3A08%3A44.mp4",
        duration: 179 
    },

    {
        song: "YABUJIN - Open",
        src: "https://easyfiles.cc/2025/5/5a9bf2f5-3844-4e0c-8dfb-943012f4acd8/YABUJIN%20-%20open.mp4",
        duration: 123
    },
    
    {
        song: "woody - Paint Thinner",
        src: "https://easyfiles.cc/2024/8/2110cfc6-d700-4c42-bc66-bafa5799c1fc/youtube_rhaFMuU1_qw_1280x720_h264(1).mp4",
        duration: 100
    },

	{
        song: "M83 - Midnight City",
        src: "https://thc.fentseller.lol/u/2025-05-29_17:34:05.mp4",
        duration: 239
    }, 
    
    {
        song: "woody - God Said I Was Good",
        src: "https://easyfiles.cc/2024/8/9cafa851-0405-4009-b639-08ff5e029dc3/youtube_Z4IF2ujq1Xk_1280x720_h264(1).mp4",
        duration: 135
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

progressBar.addEventListener("input", function (event) {
    const newTime = (progressBar.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = newTime;
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

playPauseButton.innerHTML = '<img id="plIcon" src="./assets/pause.svg">';
const icon = document.getElementById('plIcon');
playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        videoPlayer.pause();
        icon.src = "./assets/play.svg";
    } else {
        videoPlayer.play();
        icon.src = "./assets/pause.svg";
    }
    isPlaying = !isPlaying;
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
    songInfo.innerText = songs[index].song;
    progressBar.value = 0;
    totalDuration.innerText = formatTime(songs[index].duration);
    videoPlayer.load();
    videoPlayer.play();
}

videoPlayer.volume = volumeSlider.value / 100;
volumePercent.innerText = `${
    volumeSlider.value
}%`;
updateVolumeSliderBackground(volumeSlider, volumeSlider.value);

volumeSlider.addEventListener('input', function () {
    videoPlayer.volume = volumeSlider.value / 100;
    volumePercent.innerText = `${
        volumeSlider.value
    }%`;
    updateVolumeSliderBackground(volumeSlider, volumeSlider.value);
});

function updateVolumeSliderBackground(slider, value) {
    slider.style.background = `linear-gradient(to right, #ffffff 0%, #ffffff ${value}%, #cbcbcb ${value}%, #cbcbcb 100%)`;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${
        seconds.toString().padStart(2, "0")
    }`;
}

loadSong(0);
