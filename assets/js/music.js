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

export async function fetchSong() {
	const response = await fetch(url);
	if (response.status !== 200) return;

	const data = await response.json();

	const track = data?.recenttracks?.track?.[0];
	if (!track) return;

	return { 
		artist: track.artist["#text"],
		name: track.name,
		image: track.image.find(img => img.size === "extralarge")?.["#text"] || ""
	};
}

export async function populate(artistElement, songElement, coverElement) {
    fetch(url).then(response => response.json()).then(data => {
        const track = data ?. recenttracks ?. track ?. [0];
        if (!track) 
            return;

        const artist = track.artist["#text"];
        const name = track.name;
        const image = track.image.find(img => img.size === "extralarge") ?. ["#text"] || "";

        artistElement.innerText = artist;
        artistElement.href = `https://duckduckgo.com/?q=${artist}`;
        songElement.innerText = name;
        songElement.href = track.url;
        coverElement.src = !image ? "https://lastfm.freetls.fastly.net/i/u/64s/4128a6eb29f94943c9d206c08e625904.jpg" : image;
    }).catch(error => {
        console.error("Error: ", error);
    });
}

export async function fetchLyrics(artist, track, tooltipElement) {
    if (!track) return "No Lyrics";

    const url = artist
        ? `https://api.vmohammad.dev/lyrics?artist=${artist}&track=${track}`
        : `https://api.vmohammad.dev/lyrics?track=${track}`;

    const response = await fetch(url);
    if (!response.ok) return "No Lyrics";

    const data = await response.json();
    if (data.code === 404) return "No Lyrics";

	if (data.lastfmData.album.name) {
		tooltipElement.classList.add("tooltip")
		tooltipElement.setAttribute("data-tooltip", `On ${data.lastfmData.album.name}`);
	} else {
		tooltipElement.classList.remove("tooltip");
	}
    return data.enhancedLyrics.map(lyric => (lyric.text || "No Lyrics") + "<br>").join("");
}

export async function songInfo(artist, track, targetElement) {
	if (!track) return "No Lyrics"

    const url = artist
        ? `https://api.vmohammad.dev/lyrics?artist=${artist}&track=${track}`
        : `https://api.vmohammad.dev/lyrics?track=${track}`;

	const response = await fetch(url);
	if (!response || response.status !== 200) return;

	const data = await response.json();
	if (data.code === 404) {
		return targetElement = ``;
	} else {
		return targetElement.innerHTML = `
			<div class="danceability">
				<span>Danceability</span>
				<div class="danceabilitytext">${data.audioFeatures.danceability.toFixed(2)}</div>
			</div>
			<div class="energy">
				<span>Energy</span>
				<div class="energytext">${data.audioFeatures.energy.toFixed(2)}</div>
			</div>
			<div class="speechiness">
				<span>Speechiness</span>
				<div class="speechinesstext">${data.audioFeatures.speechiness.toFixed(2)}</div>
			</div>
			<div class="acousticness">
				<span>Acousticness</span>
				<div class="acousticnesstext">${data.audioFeatures.acousticness.toFixed(2)}</div>
			</div>
			<div class="instrumentalness">
				<span>Instrumentalness</span>
				<div class="instrumentalnesstext">${data.audioFeatures.instrumentalness.toFixed(2)}</div>
			</div>
			<div class="liveness">
				<span>Liveness</span>
				<div class="livenesstext">${data.audioFeatures.liveness.toFixed(2)}</div>
			</div>
		`
	}
}
