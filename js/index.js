const btn = document.getElementById('evaluate');
const input = document.getElementById('input');
const output = document.getElementById('output');

btn.addEventListener('click', function() {
	output.innerText = '';
	const originalLog = console.log;
	console.log = function(...args) {
		output.innerText += args.join(' ') + '\n';
		originalLog.apply(console, args);
	};
	try {
		let result = eval(input.value);
		if (result !== undefined) output.innerText += result;
	} catch (e) {
		output.innerText += 'Error: ' + e.message;
	}
	console.log = originalLog;
});
