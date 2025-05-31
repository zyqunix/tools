const timeElem = document.getElementById('time');
const timezone = 'Europe/Berlin';

timeElem.setAttribute('data-tooltip',timezone);

function getTime(timezone) {
	const now = new Date();
	return now.toLocaleString("en-US", {
		timezone, 
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
};

timeElem.innerHTML = getTime(timezone);

setInterval(() => {
	timeElem.innerHTML = getTime(timezone);
}, 1000);

const ageElem = document.getElementById('age');
let birthday = new Date('2008-12-13');
let age = 0;

const updateAge = () => {
	const now = new Date();
	const diff = now.getTime() - birthday.getTime();
	age = diff / (1000 * 60 * 60 * 24 * 365.25);
	ageElem.innerHTML = `${age.toFixed(2)} years old`;
}

updateAge();

const timeInterval = setInterval(() => {
	updateAge();
}, 3600 * 1000);

function lan() {
	lanyard({
		userId: "1201415921802170388",
	}).then(data => {
		const statusElem = document.getElementById('status');
		const pfpElem = document.getElementById('profile-picture');
		const activity = document.querySelector('.activity');
		const activityNameElem = document.getElementById('activity-name');
		const activityImageElem = document.getElementById('activity-image');
	
		const gameActivity = data.activities.find(activity => activity.type === 0);
		const status = data.activities.find(activity => activity.type === 4);
		const statusColors = {
			online: "#23a55a",
			idle: "#f0b232",
			dnd: "#f23f43",
			offline: "#80848e"
		};
	
		const borderColor = statusColors[data.discord_status] || statusColors.offline;
		pfpElem.style.borderColor = borderColor;

		if (status) {
			statusElem.innerHTML = `<strong class="quote">"${status.state}"</strong> - zyqunix`;
		} else {
			statusElem.innerHTML = `<strong class="quote">Empty void. Nothingness.</strong>`;
		}
	
		if (gameActivity) {
			
			const parts = [];
			if (gameActivity.name) parts.push(`<strong>Playing</strong> ${gameActivity.name}`);
			if (gameActivity.details) parts.push(gameActivity.details);
			if (gameActivity.state) parts.push(gameActivity.state);
			activityNameElem.innerHTML = parts.join(': ');
	
			if (gameActivity.assets && gameActivity.assets.large_image) {
				const imgId = gameActivity.assets.large_image;
				const imageUrl = imgId.startsWith("mp:external/")
					? `https://media.discordapp.net/${imgId.replace("mp:", "")}`
					: `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${imgId}.png`;
				activityImageElem.src = imageUrl;
				activityImageElem.style.display = "block";
			} else {
				activityImageElem.style.display = "none";
			}
		} else activity.style.display = "none";
	});
}

window.onload = (event) => {
	lan();
};

setInterval(() => {
	lan();
}, 6000);

function generateLanguageCards(languagesData) {
    const container = document.querySelector('.languages');
    
	languagesData.languages.forEach(language => {
		const languageItem = document.createElement('div');
		languageItem.classList.add('language-item');

		const namePercentContainer = document.createElement('div');
		namePercentContainer.classList.add('name-percent-container');

		const languageImage = document.createElement('img');
		languageImage.classList.add('image');
		languageImage.src = language.img;

		const languageName = document.createElement('div');
		languageName.classList.add('language-name', 'tooltip');
		languageName.textContent = language.name;
		languageName.id = language.id;
		languageName.setAttribute('data-tooltip', language.tooltip);

		const languagePercentage = document.createElement('span');
		languagePercentage.classList.add('percent');
		languagePercentage.textContent = `${language.percentage}%`;

		namePercentContainer.appendChild(languageImage);
		namePercentContainer.appendChild(languageName);
		namePercentContainer.appendChild(languagePercentage);

		const percentageBar = document.createElement('div');
		percentageBar.classList.add('percentage-bar');
		const barAfter = document.createElement('div');
		barAfter.classList.add('bar-after');
		barAfter.style.width = `${language.percentage}%`;
		percentageBar.appendChild(barAfter);

		languageItem.appendChild(namePercentContainer);
		languageItem.appendChild(percentageBar);

		container.appendChild(languageItem);
	});
}

function generateSkillCards(skillData) {
	const skillContainer = document.querySelector('.skills');
	skillData.skills.forEach(skill => {
		const skillItem = document.createElement('a');
		skillItem.classList.add('skill-item', 'tooltip');
		skillItem.id = skill.id;
		skillItem.href = skill.url;
		skillItem.target = '_blank';
		
		const skillImage = document.createElement('img');
		skillImage.classList.add('image');
		skillImage.src = skill.img;

		const skillName = document.createElement('span');
		skillName.classList.add('skill-name');
		skillName.textContent = skill.name;
		skillItem.setAttribute('data-tooltip', skill.tooltip);

		skillItem.appendChild(skillImage);
		skillItem.appendChild(skillName);
		
		skillContainer.appendChild(skillItem);
	});
}

fetch('assets/js/lang.json')
    .then(response => response.json())
    .then(generateLanguageCards)
    .catch(error => console.error('Error fetching lang.json:', error));

fetch('assets/js/skills.json')
	.then(response => response.json())
	.then(generateSkillCards)
	.catch(error => console.error('Error fetching skills.json', error));

document.querySelectorAll('.tooltip').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        const tooltipText = elem.getAttribute('data-tooltip');
        if (!tooltipText) return;

        const dummy = document.createElement('div');
        dummy.style.position = 'absolute';
        dummy.style.visibility = 'hidden';
        dummy.style.whiteSpace = 'nowrap';
        dummy.style.padding = '5px 10px';
        dummy.style.fontSize = '14px';
        dummy.innerText = tooltipText;
        document.body.appendChild(dummy);

        const elemRect = elem.getBoundingClientRect();
        const tipRect = dummy.getBoundingClientRect();
        const leftEdge = elemRect.left + (elemRect.width / 2) - (tipRect.width / 2);
        const rightEdge = elemRect.left + (elemRect.width / 2) + (tipRect.width / 2);

        elem.classList.remove('slide-left', 'slide-right');

        if (rightEdge > window.innerWidth) {
            elem.classList.add('slide-left');
        } else if (leftEdge < 0) {
            elem.classList.add('slide-right');
        }

        dummy.remove();
    });
});


const LASTFM_API_KEY = "04f747e38bebf69efbbfab7b20612bac";
const LASTFM_USERNAME = "zyqunix";

const params = new URLSearchParams({
  method: "user.getrecenttracks",
  user: LASTFM_USERNAME,
  api_key: LASTFM_API_KEY,
  format: "json",
  limit: "1"
});

const url = `https://ws.audioscrobbler.com/2.0/?${params.toString()}`;

function fetchSong() {
	fetch(url)
		.then(response => response.json())
		.then(data => {
			const track = data?.recenttracks?.track?.[0];
			if (!track) return;
			const artist = track.artist["#text"];
			const title = track.name;
			const image = track.image.find(img => img.size === "extralarge")?.["#text"] || "";

			document.getElementById("artist").innerText = artist;
			document.getElementById("artist").href = `https://duckduckgo.com/?q=${artist}`;
			document.getElementById("song-name").innerText = title;
			document.getElementById("song-cover").src = !image ? "https://lastfm.freetls.fastly.net/i/u/64s/4128a6eb29f94943c9d206c08e625904.jpg" : image;
			document.getElementById("song-url").href = track.url;
		})
		.catch(error => {
			console.error("Error:", error);
		});
}

function fetchWeather(location) {
	const target = document.getElementById('weather');
	const query = location ? location : "muc";
	fetch(`https://wttr.in/${query}?format=%t | %C`)
		.then(response => response.text())
		.then(data => {
			target.innerText = data;
		})
		.catch(() => {
			target.innerText = "Weather unavailable";
		});
}

const messages = [
    "Coding",
    "Listening to Music",
    "Reverse Engineering",
    "Playing Counter-Strike",
	"Visual Artistry",
    "swagman",	

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
    document.getElementById('hobbies').innerHTML = displayText;

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

typeWriter();
fetchWeather();
fetchSong();

let countdown = 60;

setInterval(() => {
	countdown--;
	if (countdown <= 0) {
		countdown = 60;
		fetchSong();
	}
	const refreshElem = document.getElementById('refresh');
	if (refreshElem) refreshElem.dataset.tooltip = `Refresh in ${countdown}`;
}, 1000);

function closeOverlay(popupId, overlayId) {
	document.getElementById(`${popupId}`).style.opacity = '0';
	document.getElementById(`${overlayId}`).style.opacity = '0';
	document.getElementById(`${popupId}`).style.visibility = 'hidden';
	document.getElementById(`${overlayId}`).style.visibility = 'hidden';
}

function openOverlay(popupId, overlayId) {
	const popup = document.getElementById(popupId);
	const overlay = document.getElementById(overlayId);

	popup.style.visibility = 'visible';
	overlay.style.visibility = 'visible';
	popup.style.opacity = '1';
	overlay.style.opacity = '1';
}

document.getElementById('banan').addEventListener('click', () => { openOverlay("music-pop", "overlay")});
document.getElementById('close').addEventListener('click', () => { closeOverlay("music-pop", "overlay")});
document.getElementById('overlay').addEventListener('click', () => { closeOverlay("music-pop", "overlay")});
document.getElementById('refresh').addEventListener('click', fetchSong);
