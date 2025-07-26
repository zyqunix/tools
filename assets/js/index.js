import * as wakatime from "./wakatime.js";
import * as github from "./github.js";
import * as reviewdb from "./reviewdb.js";
import * as badgeapi from "./badgesapi.js";

const timeElem = document.getElementById('time');
const timezone = 'Europe/Berlin';

export const user = "1201415921802170388";

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

export function formatTime(ms) {
	const totalSecs = Math.floor(ms / 1000);
	const hours = Math.floor(totalSecs / 3600);
	const mins = Math.floor((totalSecs % 3600) / 60);
	const secs = totalSecs % 60;

	return `${String(hours).padStart(1, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function formatVerbose(ms) {
	const totalSecs = Math.floor(ms / 1000);
	const hours = Math.floor(totalSecs / 3600);
	const mins = Math.floor((totalSecs % 3600) / 60);
	const secs = totalSecs % 60;

	return `${hours}h ${mins}m ${secs}s`;
}

export function msToTimestamp(ms, seconds=true) {
	if (seconds) {
		const timestamp = new Date(ms).toLocaleTimeString('en-GB', {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		});
		return timestamp;
	} else {
		const timestamp = new Date(ms).toLocaleTimeString('en-GB', {
			hour: "2-digit",
			minute: "2-digit"
		});
		return timestamp;
	}
}

export function timestampToMs(timestamp) {
    return new Date(timestamp).getTime();
}

export function msToDate(ms) {
	return new Date(ms).toISOString();
}

timeElem.innerHTML = getTime(timezone);

setInterval(() => {
    timeElem.innerHTML = getTime(timezone);
}, 1000);

const ageElem = document.getElementById('age');
let birthday = new Date('2008-12-13');

function updateAge(elem, fix, text) {
    const now = new Date();
    const diff = now.getTime() - birthday.getTime();
    const age = diff / (1000 * 60 * 60 * 24 * 365.25);
    const str = `${age.toFixed(fix)} ${text}`;
    if (elem) elem.innerHTML = str;

    return str;
};

updateAge(ageElem, 2, "years old");

setInterval(() => {
    updateAge(ageElem, 2, "years old");
}, 3600 * 1000);

setInterval(() => {
    ageElem.setAttribute("data-tooltip", updateAge(null, 10, "years old"));
}, 10);


function lan() {
    lanyard({userId: user}).then(data => {
        const statusElem = document.getElementById('status');
        const pfpElem = document.getElementById('profile-picture');
        const activity = document.querySelector('.activity');
        const activityNameElem = document.getElementById('activity-name');
        const activityImageElem = document.getElementById('activity-image');
		const uname = document.getElementById('username');

        const gameActivity = data.activities.find(activity => activity.type === 0);
        const status = data.activities.find(activity => activity.type === 4);
        const statusColors = {
            online: "#23a55a",
            idle: "#f0b232",
            dnd: "#f23f43",
            offline: "#80848e"
        };

		const userName = data.discord_user.display_name

		uname.innerText = userName;
		uname.href = `https://discord.com/users/${data.discord_user.id}`

		pfpElem.src = `https://cdn.discordapp.com/avatars/${user}/${data.discord_user.avatar}.webp`

        const borderColor = statusColors[data.discord_status] || statusColors.offline;
        pfpElem.style.borderColor = borderColor;

        if (status) {
            statusElem.innerHTML = `<strong class="quote">"${status.state}"</strong> - ${userName}`;
        } else {
            statusElem.innerHTML = `<strong class="quote">Empty void. Nothingness.</strong>`;
        }


        if (gameActivity) {
            const parts = [];
            if (gameActivity.name) 
                parts.push(`<strong>Playing</strong> ${gameActivity.name}`);
            

            if (gameActivity.details) 
                parts.push(gameActivity.details);
            

            if (gameActivity.state) 
                parts.push(gameActivity.state);
            
			if (gameActivity.timestamps.start)
				parts.push(`Since ${new Date(gameActivity.timestamps.start).toLocaleTimeString('en-GB', {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit"
				})}`);

            activityNameElem.innerHTML = parts.join(': ');

            if (gameActivity.assets && gameActivity.assets.large_image && !gameActivity.assets.large_image.includes("http")) {
                activityImageElem.src = `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`;
                activityImageElem.style.display = "block";
                activityImageElem.style.width = "64px";
                activityImageElem.style.height = "64px";
            } else {
                activityImageElem.style.display = "none";
            }
        } else 
            activity.style.display = "none";
    });
}

window.onload = () => {
    lan();
};

setInterval(() => {
    lan();
}, 60000);

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
        languagePercentage.textContent = `${
            language.percentage
        }%`;

        namePercentContainer.appendChild(languageImage);
        namePercentContainer.appendChild(languageName);
        namePercentContainer.appendChild(languagePercentage);

        const percentageBar = document.createElement('div');
        percentageBar.classList.add('percentage-bar');
        const barAfter = document.createElement('div');
        barAfter.classList.add('bar-after');
        barAfter.style.width = `${
            language.percentage
        }%`;
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

fetch('assets/js/lang.json').then(response => response.json()).then(generateLanguageCards).catch(error => console.error('Error fetching lang.json:', error));

fetch('assets/js/skills.json').then(response => response.json()).then(generateSkillCards).catch(error => console.error('Error fetching skills.json', error));

const LASTFM_API_KEY = "04f747e38bebf69efbbfab7b20612bac";
const LASTFM_USERNAME = "zyqunix";

const params = new URLSearchParams({
    method: "user.getrecenttracks",
    user: LASTFM_USERNAME,
    api_key: LASTFM_API_KEY,
    format: "json",
    limit: "1"
});

const url = `https://ws.audioscrobbler.com/2.0/?${
    params.toString()
}`;

function fetchSong() {
    fetch(url).then(response => response.json()).then(data => {
        const track = data ?. recenttracks ?. track ?. [0];
        if (! track) 
            return;
        

        const artist = track.artist["#text"];
        const title = track.name;
        const image = track.image.find(img => img.size === "extralarge") ?. ["#text"] || "";

        document.getElementById("artist").innerText = artist;
        document.getElementById("artist").href = `https://duckduckgo.com/?q=${artist}`;
        document.getElementById("song-name").innerText = title;
        document.getElementById("song-cover").src = ! image ? "https://lastfm.freetls.fastly.net/i/u/64s/4128a6eb29f94943c9d206c08e625904.jpg" : image;
        document.getElementById("song-url").href = track.url;
    }).catch(error => {
        console.error("Error:", error);
    });
}

async function fetchWeather(location) {
    const target = document.getElementById('weather');
    const query = location ? location : "Munich";

    try {
        const response = await fetch(`https://wttr.in/${query}?format=%t | %C&lang=en`);
        const data = await response.text();
        target.innerText = data;
        return data;
    } catch {
        target.innerText = "Weather unavailable";
        return null;
    }
}

wakatime.fetchWakatime("#wakapi");
github.writeGithubStats("#github-full");
reviewdb.writeReviews("#reviews");
badgeapi.populateBadges("#badges");

const repoData = await github.fetchGithubRepoStats("zyqunix", "tools");
document.getElementById("last_updated").innerHTML = `📆 Last updated on ${new Date(repoData.updated_at).toLocaleString("en-GB")}`;

const messages = [
    "Coding",
    "Listening to Music",
    "Reverse Engineering",
    "Playing Counter-Strike",
    "Visual Artist",
    "swagman"
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
    } displayText += "<span id='typewriter-line'>|</span>";
    document.getElementById('hobbies').innerHTML = displayText;

    if (! isDeleting && currentCharIndex === currentMessage.length + 1) {
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
fetchSong();

const weather = await fetchWeather();
weather.toLowerCase();

let deco = document.createElement("script");

if (weather.includes("rain")) {
	deco.src = "/assets/js/rain.js";
	document.body.appendChild(deco);

} else if (weather.includes("snow")) {
	deco.src = "/assets/js/snow.js";
	document.body.appendChild(deco);

} else if (weather.includes("cloud")) {
	deco.src = "/assets/js/clouds.js";
	document.body.appendChild(deco);
}

let decoShowing = true;

function toggleDeco() {
	decoShowing = !decoShowing;

	const decoElem = document.querySelector("#deco");
	decoElem.style.display = `${decoShowing ? "block" : "none"}`;

	const btn = document.querySelector("#show-deco")
	btn.innerHTML = `${decoShowing ? "Hide Decoration" : "Show Decoration"}`
}

document.querySelector("#show-deco").addEventListener("click", toggleDeco);

let countdown = 60;

setInterval(() => {
    countdown--;
    if (countdown <= 0) {
        countdown = 60;
        fetchSong();
    }
    const refreshElem = document.getElementById('refresh');
    if (refreshElem) 
        refreshElem.dataset.tooltip = `Refresh in ${countdown}`;
    

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

document.getElementById('banan').addEventListener('click', () => {
    openOverlay("music-pop", "overlay")
});

document.getElementById('close').addEventListener('click', () => {
    closeOverlay("music-pop", "overlay")
});

document.getElementById('overlay').addEventListener('click', () => {
    closeOverlay("music-pop", "overlay")
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOverlay("music-pop", "overlay");
});

document.getElementById('refresh').addEventListener('click', fetchSong);
