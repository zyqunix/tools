export async function fetchGithubUserStats(user) {
	const response = await fetch(`https://api.github.com/users/${user}`);
	if (!response.ok) throw new Error(`Error fetching Github Info: ${response.statusText}`);
	return await response.json();
}

export async function fetchGithubRepoStats(user, repo) {
	const response = await fetch(`https://api.github.com/repos/${user}/${repo}`);
	if (!response.ok) throw new Error(`Error fetching Repo Info: ${response.statusText}`);
	return await response.json();
}


export async function getTotalStars(username) {
    let page = 1;
    let totalStars = 0;
    let hasMore = true;

    while (hasMore) {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`);
        const repos = await response.json();

        if (repos.length === 0) break;
        totalStars += repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        hasMore = repos.length === 100;
        page++;
    }
    return totalStars;
}

export async function writeGithubStats(targetId) {
	const data = await fetchGithubUserStats("zyqunix");
	const stars = await getTotalStars("zyqunix");

	const target = document.querySelector(targetId);
	target.innerHTML = "";

	const mainEl = document.createElement("div");
	mainEl.classList.add("gitnamepfp");

	const pfp = document.createElement("img"); 
	pfp.src = data.avatar_url;
	pfp.style.borderRadius = "50%";
	pfp.style.width = "96px";

	const name = document.createElement("a");
	name.innerText = data.login;
	name.href = data.html_url;
	name.target = "_blank";
	name.style.fontSize = "20px";
	name.classList.add("tooltip");
	name.setAttribute("data-tooltip", data.bio);

	const pubRepos = document.createElement("a");
	pubRepos.innerText = `${data.public_repos} Public Repositories`;
	pubRepos.href = `https://github.com/${data.login}?tab=repos`;
	pubRepos.id = "pubrepos";

	const followers = document.createElement("div");
	followers.innerHTML = `<a href="https://github.com/${data.login}?tab=followers" target="_blank">${data.followers} Followers</a> & <a href="https://github.com/${data.login}?tab=following" target="_blank">Following ${data.following}`;


	const hireable = document.createElement("div");
	if (data.hireable === "null") {
		hireable.innerText = "Not Hireable";
	} else {
		hireable.innerText = "Hire Me!";
	}

	const tStars = document.createElement("div");
	tStars.innerText = `${stars} Total Stars`;

	const registered = data.created_at;
	document.getElementById("gh_since").innerText = `Registed on ${new Date(registered).toLocaleDateString("en-GB")}`;

	mainEl.appendChild(pfp);
	mainEl.appendChild(name);
	target.appendChild(mainEl);
	target.appendChild(pubRepos);
	target.appendChild(followers);
	target.appendChild(hireable);
	target.appendChild(tStars);
}