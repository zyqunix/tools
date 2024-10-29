let slideIndex = 0;
let autoScrollTimer;
const media = [
    { type: "image", src: "https://cdn.discordapp.com/attachments/1262379758478426122/1300822644509114368/image.png?ex=67223cfe&is=6720eb7e&hm=5c81ba48649c2bc0a4d249ad488d0abaa738d72949d4deb714fda4929d832aa3" },
    { type: "image", src: "https://cdn.discordapp.com/attachments/1281034862391988304/1300921012539490426/image.png?ex=6722989b&is=6721471b&hm=6fc40dd7272e62c4f2cc4cf73433d4c012d9fa939da32a72a5223f8138d4153e&&" },
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
