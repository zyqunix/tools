const sounds = {
    autist: 'wav/sound1.wav',
    downie: 'wav/sound2.wav',
    retard: 'wav/sound3.wav',
    'retarded autistic downie': 'wav/sound4.wav'
};

const button = document.getElementById('playButton');
const header = document.getElementById('played');

const toggle = document.getElementById('toggle');
const ad = document.getElementById('ad');
let isHidden = false;

button.addEventListener('click', function() {
    const audio = document.getElementById('audio');
    const keys = Object.keys(sounds);
    let randKey = keys[Math.floor(Math.random() * keys.length)];
    let randSound = sounds[randKey];

    audio.src = randSound;
    audio.play();

    header.innerHTML = randKey;
});

toggle.addEventListener('click', function() {
    if (!isHidden) {
        ad.style.display = 'none';
        isHidden = true;
    } else {
        ad.style.display = 'flex';
        isHidden = false;
    }
})