export const songs = [
    {
        song: "the girl from hamina",
        src: "/assets/music/the-girl-from-hamina.flac",
        img: "/assets/music/the-girl-from-hamina.jpg"
    },
    {
        song: "circumbinary earth",
        src: "/assets/music/circumbinary-earth.flac",
        img: "/assets/music/circumbinary-earth.jpg"
    },
    {
        song: "the hour was now",
        src: "/assets/music/the-hour-was-now.flac",
        img: "/assets/music/the-hour-was-now.jpg"
    }
]

export function populateMyMusic(songs, target) {
    songs.forEach(song => {
        target.innerHTML += 
            `
            <div class="my-music-preview shadow" style="display: flex; flex-direction: column; background: var(--surface1); border: 2px solid var(--surface2); gap: 4px; border-radius: 8px; justify-content: center; align-items: center; text-align: center; width: 100%; height: 100%; padding: 8px">
                <img src="${song.img}" class="shadow" style="height: 96; width: 96px; border-radius: 4px">
                <h4>${song.song}</h4>
                <button id="playpause-${song.song.replace(/\s/g,'')}" style="color: var(--text); font-size: 18px"><svg viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg" style="color: white"><path fill="white" d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg></button>
                <audio src="${song.src}" id="${song.song.replace(/\s/g,'').replace(/'/g,"")}">
            </div>
            `;
    })
}
