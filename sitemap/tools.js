async function fetchTools() {
    try {
        const response = await fetch('tools.json');
        if (!response.ok) {
            throw new Error("VPS response is bad");
        }
        const tools = await response.json();
        return tools;
    } catch (error) {
        console.error("Failed to fetch tools:", error);
        return [];
    }
};

function renderTools(filteredTools, language = 'en') {
    const toolList = document.getElementById('toolsMain');
    toolList.innerHTML = "";

    filteredTools.forEach(tool => {
        const toolData = {
            name: language === 'de' ? tool["name-de"] : tool.name,
            subheader: language === 'de' ? tool["subheader-de"] : tool.subheader,
            description: language === 'de' ? tool["description-de"] : tool.description,
            url: tool.url
        };

        const toolItem = document.createElement("div");
        toolItem.className = "cards";

        toolItem.innerHTML = `
        <h3 class="tool-header">↬ ${toolData.name} ↫</h3>
        <h4 class="tool-subhead">${toolData.subheader}</h4>
        <h4 class="tool-desc">${toolData.description}</h4>
        <img class="tool-media" src="assets/${tool.name}.png" alt="${tool.name} Image">
        <a id="visit" class="visit-tool" href="${toolData.url}">Visit "${toolData.name}"!</a>
        `;

        toolList.appendChild(toolItem);
    });
};

async function filterTools(filterType, language = 'en') {
    const tools = await fetchTools();
    let filteredTools;
    if (filterType) {
        filteredTools = tools;
    }
    renderTools(filteredTools, language);
}

document.getElementById('langauge-selector').addEventListener('change', async (event) => {
    const selectedLanguage = event.target.value;
    await filterTools('all', selectedLanguage);
});

filterTools('all');