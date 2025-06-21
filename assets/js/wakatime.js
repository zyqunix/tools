const langColors = {
    "C++": '#8DA9C4',
    CSS: '#B39DDB',
    TypeScript: '#90CAF9',
    TSX: '#90CAF9',
    JavaScript: '#FFF59D',
    JSX: '#FFF59D',
    Python: '#81A1C1',
    Rust: '#EBC8A9',
    HTML: '#F7A17A',
    JSON: '#A8A8A8',
    Java: '#F0B37E',
    Kotlin: '#C8A2F0',
    C: '#AAAAAA',
    unknown: '#888888'
};

const editorColors = {
    vscodium: '#6C9EFF',
    neovim: '#A0C4FF',
    intellijidea: '#C3AED6',
    notepad: '#B7D7E8',
    visualstudio: '#5C9BD1',
    androidstudio: '#A5D6A7'
};

const osColors = {
    windows: '#A0C4FF',
    "windows-shitc": "#A0C4FF",
    arch: '#89CFF0',
    macos: '#C0C0C0',
    linux: '#B0D8A6',
    ubuntu: '#F4A261',
    fedora: '#90CAF9',
    debian: '#D8BFD8'
};

const projectColors = [
    '#A8DADC',
    '#FFD6A5',
    '#FFAAA7',
    '#CDB4DB',
    '#B5EAEA',
    '#FFE066',
    '#6BCB77',
    '#FF9F1C',
    '#83C5BE',
    '#EF476F',
    '#F7CAC9',
    '#FDEBD0',
    '#D0F4DE',
    '#E4C1F9',
    '#FFF1B6',
    '#A0CED9',
    '#B8D8BA',
    '#FFBCBC',
    '#E2F0CB',
    '#F5E6E8',
    '#C9D6DF'
];  

const categoryColors = {
    coding: '#A8DADC',
    building: '#F4A261',
    debugging: '#E9C46A'
}

export function fetchWakatime(targetId, user, range) {
    const target = document.querySelector(`${targetId}`);
    target.innerHTML = "";
    fetch(`https://wakapi.atums.world/api/v1/users/${user}/stats/${range}`).then(response => response.json()).then(data => {

        const langDetails = document.createElement("details");
        const langSummary = document.createElement("summary");
        langSummary.innerText = "Languages";
        langSummary.classList.add("tooltip");
        langSummary.setAttribute("data-tooltip", "Most Used Languages");
        langDetails.appendChild(langSummary);
        langDetails.style.marginTop = "15px";
        target.appendChild(langDetails);

        const topLangs = data.data.languages.slice(0, 10);
        topLangs.forEach(lang => {
            const el = document.createElement("div");
            el.innerText = `${lang.name}: ${lang.text}`;
            el.id = lang.name.toLowerCase();
            el.classList.add("proglang");
            el.style.margin = "5px";
            el.style.padding = "10px";
            el.style.borderRadius = "5px";
            el.style.backgroundColor = langColors[lang.name];
            el.style.color = "var(--base)";
            langDetails.appendChild(el);
        });

        const edDetails = document.createElement("details");
        const edSummary = document.createElement("summary");
        edSummary.innerText = "Editors";
        edSummary.classList.add("tooltip");
        edSummary.setAttribute("data-tooltip", "Most Used Editors");
        edDetails.appendChild(edSummary);
        edDetails.style.marginTop = "15px";
        target.appendChild(edDetails);

        const topEditors = data.data.editors.slice(0, 5);
        topEditors.forEach(editor => {
            const el = document.createElement("div");
            el.innerText = `In ${editor.name} for ${editor.text} (${editor.percent}%)`;
            el.style.margin = "5px";
            el.style.padding = "10px";
            el.style.borderRadius = "5px";
            el.style.color = "var(--base)";
            el.style.backgroundColor = editorColors[editor.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-zA-Z]/g, '')];
            edDetails.appendChild(el);
        });

        const prDetails = document.createElement("details");
        const prSummary = document.createElement("summary");
        prSummary.innerText = "Projects";
        prSummary.classList.add("tooltip");
        prSummary.setAttribute("data-tooltip", "Most Used Projects");
        prDetails.appendChild(prSummary);
        prDetails.style.marginTop = "15px";
        target.appendChild(prDetails);

        const topProjects = data.data.projects.slice(0, 10);
        topProjects.forEach(project => {
            const el = document.createElement("div");
            el.innerText = `Coded ${project.name} for ${project.text}`;
            el.style.margin = "5px";
            el.style.padding = "10px";
            el.style.borderRadius = "5px";
            el.style.color = "var(--base)";
            el.style.backgroundColor = projectColors[Math.floor(Math.random() * projectColors.length)];
            prDetails.appendChild(el);
        });

        const osDetails = document.createElement("details");
        const osSummary = document.createElement("summary");
        osSummary.innerText = "Operating Systems";
        osSummary.classList.add("tooltip");
        osSummary.setAttribute("data-tooltip", "Most Used Operating Systems");
        osDetails.appendChild(osSummary);
        osDetails.style.marginTop = "15px";
        target.appendChild(osDetails);

        const topOS = data.data.operating_systems;
        topOS.forEach(machine => {
            const el = document.createElement('div');
            el.innerText = `Coded on ${machine.name} for ${machine.text}`;
            el.style.margin = "5px";
            el.style.padding = "10px";
            el.style.borderRadius = "5px";
            el.style.color = "var(--base)";
            el.style.backgroundColor = osColors[machine.name.toLowerCase()];
            osDetails.appendChild(el);
        });

        const caDetails = document.createElement("details");
        const caSummary = document.createElement("summary");
        caSummary.innerText = "Categories";
        caSummary.classList.add("tooltip");
        caSummary.setAttribute("data-tooltip", "Time Spent by Category");
        caDetails.appendChild(caSummary);
        caDetails.style.marginTop = "15px";
        target.appendChild(caDetails);

        const categories = data.data.categories;
        categories.forEach(category => {
            const el = document.createElement('div');
            el.style.margin = "5px";
            el.style.padding = "10px";
            el.style.borderRadius = "5px";
            el.style.color = "var(--base)";
            el.style.backgroundColor = categoryColors[category.name.toLowerCase()];
            el.innerText = `Has done ${category.name} for ${category.text}`;
            caDetails.appendChild(el);
        });

        const miscDetails = document.createElement("details");
        const miscSummary = document.createElement("summary");
        miscSummary.innerText = "Miscellaneous";
        miscSummary.classList.add("tooltip");
        miscSummary.setAttribute("data-tooltip", "Miscellaneous Coding Info");
        miscDetails.appendChild(miscSummary);
        miscDetails.style.marginTop = "15px";
        target.appendChild(miscDetails);

        const el = document.createElement("div");
        el.innerHTML = `
            Total Coding Time: ${data.data.human_readable_total}
            <br>
            Daily Average: ${data.data.human_readable_daily_average}
            <br>
            Days Since Register: ${data.data.days_including_holidays}
            `;
        miscDetails.appendChild(el);

        document.getElementById("stats_since").innerText = `Registered on ${data.data.start}`;
    }).catch(() => {
        target.innerHTML = `<img class="stat-img" src="https://github-readme-stats.vercel.app/api/wakatime?username=${user}&theme=transparent&hide_border=true&layout=compact">`;
    });
}
