let slideIndex = 0;
let autoScrollTimer;
const media = [
    { type: "image", src: "https://files.catbox.moe/2hhmit.png" },
    { type: "image", src: "https://files.catbox.moe/6706jd.png" },
    { type: "video", src: "https://files.catbox.moe/qyatl9.mp4" }
];

function showSlide(n) {
    const container = document.querySelector(".slideshow-container");
    container.querySelectorAll(".tool-media").forEach(el => el.remove());

    slideIndex = (n + media.length) % media.length;
    const currentMedia = media[slideIndex];

    let element;
    if (currentMedia.type === "image") {
        element = document.createElement("img");
        element.className = "tool-media";
        element.src = currentMedia.src;
    } else if (currentMedia.type === "video") {
        element = document.createElement("video");
        element.className = "tool-media";
        element.src = currentMedia.src;
        element.autoplay = true;
        element.loop = true;
        element.muted = true;
    }

    container.prepend(element);
}

function changeSlide(n) {
    showSlide(slideIndex + n);
    resetAutoScroll();
}

function resetAutoScroll() {
    clearTimeout(autoScrollTimer);
    autoScrollTimer = setTimeout(() => changeSlide(1), 11130);
}

function autoScroll() {
    autoScrollTimer = setTimeout(() => {
        changeSlide(1);
        autoScroll();
    }, 11130);
}

showSlide(slideIndex);
autoScroll();
