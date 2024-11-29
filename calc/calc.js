const num7 = document.getElementById('7');
const num8 = document.getElementById('8');
const num9 = document.getElementById('9');
const divide = document.getElementById('divide');
const sqroot = document.getElementById('sqroot');
const num4 = document.getElementById('4');
const num5 = document.getElementById('5');
const num6 = document.getElementById('6');
const mutiply = document.getElementById('mutiply');
const percent = document.getElementById('percent');
const num1 = document.getElementById('1');
const num2 = document.getElementById('2');
const num3 = document.getElementById('3');
const subtract = document.getElementById('subtract');
const fraction = document.getElementById('fraction');
const num0 = document.getElementById('0');
const decimal = document.getElementById('decimal');
const negative = document.getElementById('negative');
const add = document.getElementById('add');
const sum = document.getElementById('sum');

const result = document.querySelector('span#resultnum');

num7.addEventListener('click', () => {
    result.innerHTML = num7.innerHTML;
})