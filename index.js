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
	
		statusElem.innerHTML = `<strong class="quote">"${status ? status.state : "No Custom Status"}"</strong> - zyqunix`;
	
		if (gameActivity) {
			activityNameElem.innerHTML = `<strong>Playing</strong> ${gameActivity.name}: ${gameActivity.details}, ${gameActivity.state}`;
	
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
		} else {
			activityNameElem.innerHTML = "<strong>Playing</strong> No Game Activity";
			activityImageElem.style.display = "none";
		}
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

fetch('lang.json')
    .then(response => response.json())
    .then(generateLanguageCards)
    .catch(error => console.error('Error fetching lang.json:', error));

fetch('skills.json')
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


const frEl = document.getElementById('fr');
let rn = Math.floor(Math.random() * 2) + 1;
if (rn == 1) {
	frEl.innerHTML = "Fr*nch";
}