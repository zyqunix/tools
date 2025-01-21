const time = document.getElementById('time');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const sound = new Audio('/assets/pipe.mp3');

let timer = null;
let isActive = false;
let remainingTime = 0;
let startTime = null;

function formatTime(duration) {
    const milliseconds = Math.floor((duration % 1000) / 10);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    const hours = Math.floor(duration / 1000 / 60 / 60);
    return `${
        String(hours).padStart(2, '0')
    }:${
        String(minutes).padStart(2, '0')
    }:${
        String(seconds).padStart(2, '0')
    }:${
        String(milliseconds).padStart(2, '0')
    }`;
}

function updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;
    remainingTime -= elapsed;
    startTime = now;

    if (remainingTime <= 0) {
        clearInterval(timer);
        sound.play();
        time.textContent = "00:00:00:00";
        isActive = false;
        start.innerHTML = "Start";
    } else {
        time.textContent = formatTime(remainingTime);
    }
}

start.addEventListener('click', () => {
    if (! isActive) {
        const hours = parseInt(hoursInput.value, 10) || 0;
        const minutes = parseInt(minutesInput.value, 10) || 0;
        const seconds = parseInt(secondsInput.value, 10) || 0;

        if (hours < 0 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            alert("Please enter valid time values.");
            return;
        }

        remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

        if (remainingTime <= 0) {
            alert("Please enter a valid time duration.");
            return;
        }

        isActive = true;
        start.innerHTML = "Stop";
        startTime = Date.now();

        timer = setInterval(updateTimer, 10);
    } else {
        isActive = false;
        clearInterval(timer);
        start.innerHTML = "Start";
    }
});

reset.addEventListener('click', () => {
    isActive = false;
    clearInterval(timer);
    timer = null;
    remainingTime = 0;
    time.textContent = "00:00:00:00";
    start.innerHTML = "Start";
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
});
