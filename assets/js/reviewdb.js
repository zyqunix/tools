import { msToDate, msToTimestamp } from "./index.js";

const API_URL = "https://manti.vendicated.dev/api/reviewdb";
const user = "1201415921802170388";

export async function fetchReviews(user) {
    const response = await fetch(`${API_URL}/users/${user}/reviews`);
    if (!response.ok) throw new Error(`Error fetching reviews: ${response.status} ${response.statusText}`);
    const data = await response.json();
    data.reviews = data.reviews.filter(r => r.id !== 0);
    return data;
}

export async function writeReviews(target) {
	const element = document.querySelector(target);
    const data = await fetchReviews(user);

    element.innerHTML = "";

    data.reviews.forEach(review => {
        const el = document.createElement("div");
		el.classList.add("shadow", "review");
		el.style.transition = "background 0.3s";
		el.style.margin = "10px";
		el.style.padding = "15px";
		el.style.border = "2px solid var(--surface1)";
		el.style.borderRadius = "5px";
		el.innerHTML = `
			<div style="display: flex; justify-content: space-between; align-items: center; max-width: 100vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
				<div style="display: flex; justify-content: left; align-items: center;">
					<img src="${review.sender.profilePhoto}" style="height: 48px; border-radius: 50%; margin-right: 10px">
					<a style="margin:0; color: var(--text);" id="review-person" href="https://discord.com/users/${review.sender.discordID}">${review.sender.username}</a>
				</div>
				<div style="display: flex; justify-content: left; align-items: center;">
					<span style="margin-left: 10px; color: var(--overlay1); font-size: 0.8rem">${msToDate(review.timestamp * 1000).split('T')[0].replace(/-/g, '/')} @ ${msToTimestamp(review.timestamp * 1000, false)}</span>
				</div>
			</div>	
			<p style="margin: 5px; max-width: 100vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${review.comment}</p>
		`;
        element.appendChild(el);
	});
}
