import * as wakatime from "./wakatime.js";
import * as github from "./github.js";
import * as reviewdb from "./reviewdb.js";
import * as badgeapi from "./badgesapi.js";
import * as music from "./music.js";
import * as cs from "./cs.js";
import * as mm from "./my_music.js";
import * as projects from "./projects.js";

const timeElem = document.getElementById('time');
const timezone = 'Europe/Berlin';

export const user = "1201415921802170388";

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
	const d = new Date(ms);
	return `${d.getUTCHours()}h ${d.getUTCMinutes()}m ${d.getUTCSeconds()}s`;
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

function resolveActivityImage(img, applicationId) {
	if (!img) return null;

	if (img.startsWith("mp:external/")) {
		return `https://media.discordapp.net/external/${img.slice("mp:external/".length)}`;
	}

	if (img.includes("/https/")) {
		const clean = img.split("/https/")[1];
		return clean ? `https://${clean}` : null;
	}

	if (img.startsWith("spotify:")) {
		return `https://i.scdn.co/image/${img.split(":")[1]}`;
	}

	if (img.startsWith("twitch:")) {
		const username = img.split(":")[1];
		return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${username}-440x248.jpg`;
	}

	return `https://cdn.discordapp.com/app-assets/${applicationId}/${img}.png`;
}


function lan() {
    lanyard({userId: user}).then(data => {
		console.log(data);
        const statusElem = document.getElementById('status');
        const pfpElem = document.getElementById('profile-picture');
        const activity = document.querySelector('.activity');
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
            statusElem.innerHTML = `<strong class="quote">No smart quote.</strong>`;
        }

		if (!gameActivity) {
			activity.style.display = "none";
		} else {
			activity.style.display = "flex";
			activity.innerHTML = `
				<div style="filter: brightness(0.8); display: flex; justify-content: space-between; width: 100%; flex-direction: row;">
					<div>Playing</div>
					<div>Since ${msToTimestamp(new Date(gameActivity.timestamps.start))}</div>
				</div>
				<div style="display: flex; justify-content: left; flex-direction: row; gap: 1.5rem;">
					<div class="activityimages" style="position: relative; width: 80px; height: 80px;">
						<img style="height: 80px; width: 80px; position: relative; border-radius: 0.25rem" src="${resolveActivityImage(gameActivity.assets.large_image, gameActivity.application_id)}">
                        <img style="height: 25px; width:25px; border-radius: 50%; object-fit: cover; position: absolute; bottom: -6px; right: -6px; ${gameActivity.assets.small_image ? '' : 'display: none;'}" src="${resolveActivityImage(gameActivity.assets.small_image, gameActivity.application_id)}">					</div>
					<div class="activitymain" style="display: flex; flex-direction: column; gap: 0.25rem">
						<strong>${gameActivity.name}</strong>
						<span>${gameActivity.state}</span>
						<span>${gameActivity.details}</span>
					</div>
				</div>
			`;
		}

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

try {
	const repoData = await github.fetchGithubRepoStats("zyqunix", "tools");
	github.writeGithubStats("#github-full");
	document.getElementById("last_updated").innerHTML = `📆 Last updated on ${new Date(repoData.updated_at).toLocaleString("en-GB")}`;
} catch (e) {
	document.getElementById("github-full").innerHTML = `<h1>403 Error: Rate Limited</h1>`;
}

reviewdb.writeReviews("#reviews");
badgeapi.populateBadges("#badges");


async function updateSong() {
    music.populate(document.getElementById("artist-name"), document.getElementById("song-name"), document.getElementById("cover"), document.getElementById("scrobbles"));
    const song = await music.fetchSong();
    const lyrics = await music.fetchLyrics(song.artist, song.name, document.getElementById("song-name"));
    music.songInfo(song.artist, song.name, document.getElementById("songinfo"));
    document.getElementById("lyrics").innerHTML = lyrics || "No Lyrics";
    music.fetchRecents(document.getElementById("recents"));
}

updateSong();
setInterval(updateSong, 30000);

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

export function closeOverlay(popupId, overlayId, display) {
    document.getElementById(`${overlayId}`).style.opacity = '0';
    document.getElementById(`${overlayId}`).style.display = display;
}

export function openOverlay(popupId, overlayId, display) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById(overlayId);

    popup.style.display = display;
    overlay.style.display = display;
    popup.style.opacity = '1';
    overlay.style.opacity = '1';
}

document.getElementById("recent-plays").addEventListener("click", () => {
    openOverlay("recent-plays", "recentsmain", "flex");
})

document.getElementById("close-recents").addEventListener("click", () => {
    closeOverlay("recents", "recentsmain", "none");
})

function togglePlaying(audio, btn) {
  if (audio.paused) {
      audio.play();
      btn.innerHTML = `<svg viewBox="0 0 16 16" class="bi bi-pause-fill" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" style="color: white"><path fill="white" d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>`;
  } else {
      audio.pause();
      btn.innerHTML = `<svg viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" style="color: white"><path fill="white" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>`;
  }
}

cs.populateLeetify(document.getElementById("cs2-full"));

if (document.referrer.includes("steampowered.com")) {
    window.location.href = "#CS Stats";
}

mm.populateMyMusic(mm.songs, document.getElementById("music-container"));

document.querySelector("#playpause-thegirlfromhamina").onclick = () => togglePlaying(document.querySelector("#thegirlfromhamina"), document.querySelector("#playpause-thegirlfromhamina"));
document.querySelector("#playpause-circumbinaryearth").onclick = () => togglePlaying(document.querySelector("#circumbinaryearth"), document.querySelector("#playpause-circumbinaryearth"));
document.querySelector("#playpause-thehourwasnow").onclick = () => togglePlaying(document.querySelector("#thehourwasnow"), document.querySelector("#playpause-thehourwasnow"));


projects.populateProjects(document.getElementById("projects-main"))
