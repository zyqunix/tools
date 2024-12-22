const colorButton = document.getElementById('colorButton');
const fullColor = document.getElementById('fullColor');
const main = document.getElementById('main');
const offscreenAlert = document.getElementById('offscreenalert');

const chars = "0123456789ABCDEF";

function generateRandomHexColor() {
    return `#${Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')}`;
}

function applyColor(color) {
    fullColor.textContent = color;
    main.style.backgroundColor = color;
}

function copyToClipboard(text) {
    return navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard");
    }).catch(err => {
        console.error("Failed to copy content:", err);
    });
}

function showAlert() {
    offscreenAlert.style.top = '10px';
    setTimeout(() => {
        offscreenAlert.style.top = '-70px';
    }, 2500);
}

colorButton.addEventListener('click', () => {
    const newColor = generateRandomHexColor();
    applyColor(newColor);
});

main.addEventListener('click', () => {
    const colorText = fullColor.textContent || fullColor.innerHTML;
    copyToClipboard(colorText).then(showAlert);
});
