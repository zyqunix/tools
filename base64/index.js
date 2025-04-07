const decodeElem = document.getElementById('decodeInput');
const encodeElem = document.getElementById('encodeInput');
const decodeOut = document.getElementById('decodeOutput');
const encodeOut = document.getElementById('encodeOutput');

function encodeBase64() {
	const input = encodeElem.value;
	const encoded = btoa(input);
	encodeOut.value = encoded;
}

function decodeBase64() {
	const input = decodeElem.value;
	try {
		const decoded = atob(input);
		decodeOut.value = decoded;
	} catch {
		decodeOut.value = 'Invalid Base64 input';
	}
}

document.getElementById('encode').addEventListener('click', encodeBase64);
document.getElementById('decode').addEventListener('click', decodeBase64);
