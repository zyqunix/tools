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
    };
};

function renderTools(filteredTools) {
    const toolList = document.getElementById('toolsMain');
    toolList.innerHTML = "";

    if (filteredTools.length === 0) {
        toolList.innerHTML = "<div class='text-center'>No tools match the selected filter.</div>"
        return;
    }

    filteredTools.sort((a, b) => b.description - a.description);
    filteredTools.forEach(tool => {
        const toolItem = document.createElement("div");
        toolItem.id = "tool-div";

        toolItem.innerHTML = `
        <h1 class="tool-header">${tool.name}</h1>
        <h2 class="tool-subhead"><u>${tool.subheader}</u></h2>
        <h2 class="tool-desc">${tool.description}</h2>
        <img class="tool-media" src="assets/${tool.name}.png" alt="${tool.name} Image">
        <a id="visit" class="visit-tool" href="${tool.url}">Try the "${tool.name}" tool!</a>
        `;

        toolList.appendChild(toolItem);
    });
};

async function filterTools(filterType) {
    const tools = await fetchTools();
    let filteredTools;
    if (filterType) {
        filteredTools = tools;
    }
    renderTools(filteredTools);
}

filterTools('all');
