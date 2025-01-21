const time = document.getElementById('time');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const lap = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

let isActive = false;
let timer = null;
let startTime = null;
let elapsedTime = 0;

function formatTime(duration) {
    const milliseconds = Math.floor((duration % 1000) / 10);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / 1000) / 60) % 60;
    const hours = Math.floor((duration / 1000) / 3600);
    return `
    ${
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
    elapsedTime = Date.now() - startTime;
    time.textContent = formatTime(elapsedTime);
}

start.addEventListener('click', () => {
    if (! isActive) {
        isActive = true;
        start.innerHTML = "Stop";
        startTime = Date.now() - elapsedTime;
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
    startTime = null;
    elapsedTime = 0;
    time.textContent = "00:00:00:00";
    start.innerHTML = "Start";
    lapList.innerHTML = "";
});

lap.addEventListener('click', () => {
    if (isActive) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(elapsedTime);
        lapList.appendChild(lapTime);
    }
});
