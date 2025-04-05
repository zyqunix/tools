const morseElem = document.getElementById('translate-to-morse');
const textElem = document.getElementById('translate-to-text');
const soundElem = document.getElementById('play-sound');
const exportElem = document.getElementById('export');

const morseCode = {
	'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.', 'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---', 'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---', 'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-', 'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--', 'Z': '--..',  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

const morseToText = Object.fromEntries(Object.entries(morseCode).map(([key, value]) => [value, key]));

function translateToMorse() {
	const text = document.getElementById('textInput').value.toUpperCase();
	const morse = text.split('').map(char => morseCode[char] || '').join(' ');
	document.getElementById('morseOutput').value = morse;
}

function translateToText() {
	const morse = document.getElementById('morseOutput').value.trim();
	const text = morse.split(' ').map(code => morseToText[code] || '').join('');
	document.getElementById('textInput').value = text;
}

function playMorseSound() {
	const morse = document.getElementById('morseOutput').value.trim();
	let audioContext = new (window.AudioContext || window.webkitAudioContext)();
	let dotDuration = 200;
	let dashDuration = dotDuration * 3;
	let gapDuration = dotDuration; 

	function playTone(freq, duration, volume) {
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		oscillator.type = 'sine';
		oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
		gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
		oscillator.start();
		oscillator.stop(audioContext.currentTime + duration / 1000);
	}

	let position = 0;
	function playMorseCode() {
		if (position < morse.length) {
			const symbol = morse[position];

			if (symbol === '.') {
				playTone(1000, dotDuration, 0.1);
				position++;
				setTimeout(playMorseCode, dotDuration + gapDuration);
			} else if (symbol === '-') {
				playTone(1000, dashDuration, 0.1);
				position++;
				setTimeout(playMorseCode, dashDuration + gapDuration);
			} else if (symbol === ' ') {
				position++;
				setTimeout(playMorseCode, gapDuration);
			}
		}
	}

	playMorseCode();
}

function exportSound() {
    const morse = document.getElementById('morseOutput').value.trim();
    let dotDuration = 200;
    let dashDuration = dotDuration * 3;
    let gapDuration = dotDuration;

    let sampleRate = 44100;
    let samples = [];

    function addSilence(duration) {
        let count = (sampleRate * duration) / 1000;
        for (let i = 0; i < count; i++) {
            samples.push(0);
        }
    }

    function addTone(freq, duration) {
        let count = (sampleRate * duration) / 1000;
        for (let i = 0; i < count; i++) {
            let t = i / sampleRate;
            samples.push(Math.sin(2 * Math.PI * freq * t));
        }
    }

    for (let symbol of morse) {
        if (symbol === '.') {
            addTone(1000, dotDuration);
            addSilence(gapDuration);
        } else if (symbol === '-') {
            addTone(1000, dashDuration);
            addSilence(gapDuration);
        } else if (symbol === ' ') {
            addSilence(gapDuration);
        }
    }

    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    function writeString(offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

	// i have no idea what this shit is or how it works, but it does :rofl:
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples.length * 2, true);

    for (let i = 0; i < samples.length; i++) {
        let s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(44 + i * 2, s * 32767, true);
    }

    const blob = new Blob([view], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'morse-code.wav';
    a.click();
}


morseElem.addEventListener('click', translateToMorse);

textElem.addEventListener('click', translateToText);

soundElem.addEventListener('click', playMorseSound);

exportElem.addEventListener('click', exportSound);
