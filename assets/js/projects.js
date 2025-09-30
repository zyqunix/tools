const projes = [
    {
        url: "https://heliopolis.live/zyqunix/nogoonkt",
        name: "NoGoonKt",
        description: "No Gooning App",
        img: "/NoGoon/assets/Main%20Screen.png",
        langs: ["Kotlin"]
    },
    {
        url: "https://github.com/zyqunix/tools",
        name: "Tools",
        description: "This Website",
        img: "https://fent.zyqunix.dev/raw/2025-09-30_20%3A20%3A17.png",
        langs: [
                "HTML",
                "CSS",
                "JavaScript"
            ]
    },
    {
        url: "https://heliopolis.live/zyqunix/Astatine",
        name: "Astatine",
        description: "GDI Malware",
        img: "https://atums.world/raw/epic%206534.jpg",
        langs: ["C++"]
    },
    {
        url: "https://heliopolis.live/zyqunix/gradr",
        name: "Gradr",
        description: "School Grade Average",
        img: "https://fent.zyqunix.dev/raw/2025-09-30_20%3A31%3A51.png",
        langs: ["Kotlin"]
    }
]

export function populateProjects(target) {
    projes.forEach(project => {
        target.innerHTML += `
            <a href="${project.url}" target="_blank">
                <div class="shadow" style="display: flex; justify-content: center; align-items: center; padding: 6px; background-color: var(--surface1); flex-direction: column; border-radius: 8px; gap: 4px">
                    <h4 style="margin: 0 !important">${project.name}</h5>
                    <h5 style="margin: 0 0 4px 0 !important">${project.description}</h5>
                    <img src="${project.img}" style="width: 128px; height: 128px; object-fit: cover; border-radius: 10px">
                    <div>
                        ${
                            project.langs.map(lang => 
                                `<div style="background-color: var(--lavender); border-radius: 0.5rem; padding: 4px 8px; margin: 2px; display: inline-block">${lang}</div>`
                            ).join('')
                        }
                    </div>
                </div>
            </a>
        `;
    })
}
