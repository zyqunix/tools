async function fetchprojects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error("VPS response is bad");
        }
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
    };
};

function renderprojects(filteredprojects) {
    const projectList = document.getElementById('projectsMain');
    projectList.innerHTML = "";

    if (filteredprojects.length === 0) {
        projectList.innerHTML = "<div class='text-center'>No projects.</div>"
        return;
    }

    filteredprojects.sort((a, b) => b.description - a.description);
    filteredprojects.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.className = "project-div";

        projectItem.innerHTML = `
        <h1 class="project-header">${project.name}</h1>
        <h2 class="project-subhead">${project.subheader}</h2>
        <h2 class="project-desc">${project.description}</h2>
        <a id="visit" class="visit-project" href="${project.url}">Go to <strong>${project.name}</strong>!</a>
        `;

        projectList.appendChild(projectItem);
    });
};

async function filterprojects(filterType) {
    const projects = await fetchprojects();
    let filteredprojects;
    if (filterType) {
        filteredprojects = projects;
    }
    renderprojects(filteredprojects);
}

filterprojects('all');
