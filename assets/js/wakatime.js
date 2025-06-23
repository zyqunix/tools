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
};

export async function fetchWakaTimeStats(user, range) {
    const response = await fetch(`https://wakapi.atums.world/api/v1/users/${user}/stats/${range}`);
    if (!response.ok) throw new Error(`Error fetching WakaTime stats: ${response.statusText}`);
    return await response.json();
}

export async function prepareChartData() {
    const languages = await fetchWakaTimeStats("zyqunix", "all_time");
    const sortedLanguages = [...languages.data.languages].sort((a, b) => b.percent - a.percent);

    const totalSeconds = sortedLanguages.reduce((total, lang) => total + lang.total_seconds, 0);
    let totalTime = '';

    if (totalSeconds > 3600) {
        totalTime = `${Math.floor(totalSeconds / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m`;
    } else {
        totalTime = `${Math.floor(totalSeconds / 60)}m`;
    }

    const limit = 10;
    const topLanguages = sortedLanguages.slice(0, limit);

    if (sortedLanguages.length > limit) {
        const otherSeconds = sortedLanguages.slice(limit).reduce((total, lang) => total + lang.total_seconds, 0);
        const otherPercent = sortedLanguages.slice(limit).reduce((total, lang) => total + lang.percent, 0);

        let otherText = '';
        if (otherSeconds > 3600) {
            otherText = `${Math.floor(otherSeconds / 3600)}h ${Math.floor((otherSeconds % 3600) / 60)}m`;
        } else {
            otherText = `${Math.floor(otherSeconds / 60)}m`;
        }

        topLanguages.push({
            name: 'Other',
            total_seconds: otherSeconds,
            percent: otherPercent,
            text: otherText,
            color: '#CCCCCC',
            digital: '',
            hours: Math.floor(otherSeconds / 3600),
            minutes: Math.floor((otherSeconds % 3600) / 60),
            seconds: otherSeconds % 60
        });
    }

    const segmentsWithColors = topLanguages.map(lang => ({
        ...lang,
        color: lang.color || langColors[lang.name] || '#CCCCCC'
    }));

    return {
        segments: segmentsWithColors,
        totalTime
    };
}

export async function fetchWakatime(targetId) {
    const data = await fetchWakaTimeStats("zyqunix", "all_time");
    const target = document.querySelector(`${targetId}`);
    target.innerHTML = "";

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
    miscSummary.setAttribute("data-tooltip", "Miscellaneous Wakatime Info");
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

	const registered = data.data.start;
    document.getElementById("stats_since").innerText = `Registered on ${registered.slice(0, 10).replace(/-/g, "/")}`;

    const chartDetails = document.createElement("details");
    const chartSummary = document.createElement("summary");
    chartSummary.innerText = "Chart";
    chartSummary.classList.add("tooltip");
    chartSummary.setAttribute("data-tooltip", "Miscellaneous Coding Info");
    chartDetails.appendChild(chartSummary);
    chartDetails.style.marginTop = "15px";
    target.appendChild(chartDetails);

    const chartData = await prepareChartData();


    const svgNS = "http://www.w3.org/2000/svg";
    const radius = 50;
    const center = 60;
    const strokeWidth = 20;
    const circumference = 2 * Math.PI * radius;

    const container = document.createElement("div");

    const legend = document.createElement("div");
    legend.style.display = 'flex';
    legend.style.flexDirection = 'column';
    legend.style.gap = '8px';
    legend.id = 'legend';

    chartData.segments.forEach(segment => {
        const label = document.createElement('div');
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '8px';

        const colorBox = document.createElement('span');
        colorBox.style.width = '10px';
        colorBox.style.height = '10px';
        colorBox.style.backgroundColor = segment.color;
        colorBox.style.borderRadius = '3px';

        const text = document.createElement('span');
        text.innerText = `${segment.name} (${segment.text})`;

        label.appendChild(colorBox);
        label.appendChild(text);
        legend.appendChild(label);
    });

    const chart = document.createElementNS(svgNS, "svg");
    chart.setAttribute("viewBox", "0 0 120 120");
    chart.style.width = "120px";
    chart.style.height = "120px";

    let cumulativePercent = 0;

    chartData.segments.forEach(segment => {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", center);
        circle.setAttribute("cy", center);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", segment.color);
        circle.setAttribute("stroke-width", strokeWidth);
        circle.setAttribute("transform", `rotate(-90 ${center} ${center})`);

        const segmentLength = (segment.percent / 100) * circumference;
        const emptyLength = circumference - segmentLength;

        circle.setAttribute("stroke-dasharray", `${segmentLength} ${emptyLength}`);
        circle.setAttribute("stroke-dashoffset", circumference * (1 - cumulativePercent / 100));

        cumulativePercent += segment.percent;

        chart.appendChild(circle);
    });

    container.appendChild(legend);
    container.appendChild(chart);

    chartDetails.appendChild(container);

}
