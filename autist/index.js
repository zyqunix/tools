const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    const audio = button.querySelector('audio');
    button.addEventListener('click', function() {
        if (audio) {
            audio.play();
        }
    });
});


const toggle = document.getElementById('toggle');
const ad = document.getElementById('ad');
let isHidden = false;

toggle.addEventListener('click', function() {
    if (!isHidden) {
        ad.style.display = 'none';
        isHidden = true;
    } else {
        ad.style.display = 'flex';
        isHidden = false;
    }
})