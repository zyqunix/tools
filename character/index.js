const textElem = document.getElementById('input');
const countElem = document.getElementById('count');

setInterval(() => {
	countElem.innerText = textElem.value.length;
}, 100);
