const songs = [
    {
        song: "Julia - Between the Bars",
        src: "https://atums.world/raw/between%20the%20bars%20-%20julia%20(1080p,%20h264).mp4",
        duration: 201
    },
    {
        song: "PinkPantheress - Mosquito",
        src: "https://easyfiles.cc/2024/12/895c8869-5a2e-4458-b70a-5b91a3d99b64/PinkPantheress%20-%20Mosquito%20(Official%20Video)%20-%20Pinkpantheress%20(1080p,%20av1).mp4",
        duration: 159
    },

    {
        song: "woody - Paint Thinner",
        src: "https://easyfiles.cc/2024/8/2110cfc6-d700-4c42-bc66-bafa5799c1fc/youtube_rhaFMuU1_qw_1280x720_h264(1).mp4",
        duration: 100
    },

    {
        song: "Joeyy - PR Package",
        src: "https://easyfiles.cc/2024/8/7c649f45-6573-4665-9675-4d869ea1332a/youtube_ZvphwrKo52s_1280x720_h264(1).mp4",
        duration: 111
    },

    {
        song: "woody - Heaven & Hell",
        src: "https://easyfiles.cc/2024/9/20fa08a2-8212-4212-93b7-9c62fc563505/woody%20heaven%20&%20hell%20prod.%201mint%20-%20real1woody%20(1080p,%20h264)(1).mp4",
        duration: 142
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

playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        videoPlayer.pause();
        playPauseButton.innerHTML = "&#9658;";
    } else {
        videoPlayer.play();
        playPauseButton.innerHTML = "&#10074;&#10074;";
    } isPlaying = ! isPlaying;
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
