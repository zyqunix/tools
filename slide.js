let slideIndex = 0;
const images = [
    "https://cdn.discordapp.com/attachments/1262379758478426122/1300822644509114368/image.png?ex=67223cfe&is=6720eb7e&hm=5c81ba48649c2bc0a4d249ad488d0abaa738d72949d4deb714fda4929d832aa3",
    "https://cdn.discordapp.com/attachments/1281034862391988304/1300921012539490426/image.png?ex=6722989b&is=6721471b&hm=6fc40dd7272e62c4f2cc4cf73433d4c012d9fa939da32a72a5223f8138d4153e&&",
    "https://cdn.discordapp.com/attachments/1250368193114148907/1285283453595811934/togif.gif?ex=6722657e&is=672113fe&hm=cbc1659cfae2d4b0657cf3d0daf13081923e6ea6dce6030072a2b9c3c560d30b&"
];

function showSlide(n) {
    const image = document.querySelector(".tool-image");
    slideIndex = (n + images.length) % images.length;
    image.src = images[slideIndex];
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

function autoScroll() {
    changeSlide(1);
    setTimeout(autoScroll, 10000);
}

showSlide(slideIndex);
autoScroll();
