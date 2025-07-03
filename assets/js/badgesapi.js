import { user } from "./index.js";
const apiUrl = "https://badges.atums.world";


export async function getBadges(user) {
    const response = await fetch(`${apiUrl}/${user}`);
    if (!response.ok) throw new Error(`Error fetching reviews: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data;
}

export async function populateBadges(element) {
	const target = document.querySelector(element);
	const data = await getBadges(user);

	target.innerHTML = "";

	data.badges.forEach(badge => {
		const badgeEl = document.createElement("div");
		const badgeImg = document.createElement("img");
		badgeImg.src = badge.badge;
		badgeEl.classList.add("tooltip");
		badgeEl.setAttribute("data-tooltip", badge.tooltip);
		badgeImg.style.width = "32px";

		badgeEl.appendChild(badgeImg);
		target.appendChild(badgeEl);
	})
}
