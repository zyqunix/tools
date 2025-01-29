const messages = [
    "PinkPantheress 💘💘💖🥰",
    "lispnb and pluggnb 💖💖",
    "woody.. my dearest 🥰💓",
    "Donate Crypto!",
    "iluvshed",
    "#lacethemwithfent",
    "#lifeiseasy",
];

let currentMessageIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentMessage = messages[currentMessageIndex];
    let displayText = '';

    if (isDeleting) {
        displayText = currentMessage.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        displayText = currentMessage.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    displayText += "<span id='typewriter-line'>|</span>";
    document.getElementById('typewriter').innerHTML = displayText;

    if (!isDeleting && currentCharIndex === currentMessage.length + 1) {
        isDeleting = true;
        setTimeout(typeWriter, 1000);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
        setTimeout(typeWriter, 1000);
    } else {
        setTimeout(typeWriter, isDeleting ? 40 : 75);
    }
}

let cursorOpacity = 0;
let fadeDirection = 1;

setInterval(() => {
    const cursorElement = document.getElementById("typewriter-line");

    if (cursorElement) {
        cursorElement.style.opacity = cursorOpacity;
        cursorOpacity += 0.1 * fadeDirection;

        if (cursorOpacity <= 0 || cursorOpacity >= 1) {
            fadeDirection *= -1;
        }
    }
}, 50);

document.addEventListener("DOMContentLoaded", function () {
    let titleIndex = 0;
    let increasingTitle = true;

    function updateTitle() {
        const titleText = "@zyqunix";

        if (increasingTitle) {
            document.title = titleText.substring(0, titleIndex + 1);
            titleIndex++;

            if (titleIndex === titleText.length) {
                increasingTitle = false;
                setTimeout(updateTitle, 1500);
                return;
            }
        } else {
            document.title = titleText.substring(0, titleIndex - 1);
            titleIndex--;

            if (titleIndex === 1) {
                increasingTitle = true;
                setTimeout(updateTitle, 500);
                return;
            }
        }

        setTimeout(updateTitle, 333);
    }

    updateTitle();
});

let clickToEnterOverlay = document.getElementById("clickToEnter");
clickToEnterOverlay.onclick = () => {
    clickToEnterOverlay.style.transition = '0.75s';
    clickToEnterOverlay.style.opacity = '0';
    clickToEnterOverlay.style.zIndex = '-9999';

    main.style.opacity = '1';
    main.style.marginTop = "0px";

    videoPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;";
    isPlaying = !isPlaying;

    typeWriter();
};

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keydown", event => {
        if (event.ctrlKey && ['s', 'c', 'e', 'u'].includes(event.key.toLowerCase())) {
            event.preventDefault();
            window.location.href = 'https://pornhub.com/gay';
        }
    });

    document.addEventListener("contextmenu", event => event.preventDefault());
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

document.addEventListener("DOMContentLoaded", () => {
    const tooltips = document.querySelectorAll('[class*="tooltip"]:not([id="name"])');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            tooltip.classList.add('active');
        });

        tooltip.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });

        tooltip.addEventListener('click', () => {
            const originalTooltip = tooltip.getAttribute('data-tooltip');
            tooltip.setAttribute('data-tooltip', 'Copied to Clipboard!');
            setTimeout(() => {
                tooltip.setAttribute('data-tooltip', originalTooltip);
            }, 1000);
        });
    });
});
