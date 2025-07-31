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

export async function populate() {
    fetch(url).then(response => response.json()).then(data => {
        const track = data ?. recenttracks ?. track ?. [0];
        if (! track) 
            return;
        

        const artist = track.artist["#text"];
        const name = track.name;
        const image = track.image.find(img => img.size === "extralarge") ?. ["#text"] || "";

        document.getElementById("artist-name").innerText = artist;
        document.getElementById("artist-name").href = `https://duckduckgo.com/?q=${artist}`;
        document.getElementById("song-name").innerText = name;
        document.getElementById("song-name").href = track.url;
        document.getElementById("cover").src = ! image ? "https://lastfm.freetls.fastly.net/i/u/64s/4128a6eb29f94943c9d206c08e625904.jpg" : image;
    }).catch(error => {
        console.error("Error:", error);
    });
}


export async function fetchLyrics(artist, track) {
    if (!track) return "No Lyrics";

    const url = artist
        ? `https://lrclib.net/api/get?artist_name=${artist}&track_name=${track}`
        : `https://lrclib.net/api/get?track_name=${track}`;

    const response = await fetch(url);
    if (!response || response.status !== 200) return "No Lyrics";

    const data = await response.json();
    if (data.code === 404) return "No Lyrics";
    
	return data.plainLyrics || "No Lyrics";
}
