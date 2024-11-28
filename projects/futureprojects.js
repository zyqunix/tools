async function fetchfutureprojects() {
    try {
        const response = await fetch('futureprojects.json');
        if (!response.ok) {
            throw new Error("VPS response is bad");
        }
        const futureprojects = await response.json();
        return futureprojects;
    } catch (error) {
        console.error("Failed to fetch futureprojects:", error);
        return [];
    };
};

function renderfutureprojects(filteredfutureprojects) {
    const futureprojectList = document.getElementById('projectsFuture');
    futureprojectList.innerHTML = "";

    if (filteredfutureprojects.length === 0) {
        futureprojectList.innerHTML = "<div class='text-center'>No Future Projects.</div>"
        return;
    }

    filteredfutureprojects.sort((a, b) => b.description - a.description);
    filteredfutureprojects.forEach(futureproject => {
        const futureprojectItem = document.createElement("div");
        futureprojectItem.className = "futureproject-div";

        futureprojectItem.innerHTML = `
        <h1 class="futureproject-header">${futureproject.name}</h1>
        <h2 class="futureproject-subhead">${futureproject.subheader}</h2>
        <h2 class="futureproject-desc">${futureproject.description}</h2>
        <a id="visit" class="visit-futureproject" href="${futureproject.url}">Go to <strong>${futureproject.name}</strong>!</a>
        `;

        futureprojectList.appendChild(futureprojectItem);
    });
};

async function filterfutureprojects(filterType) {
    const futureprojects = await fetchfutureprojects();
    let filteredfutureprojects;
    if (filterType) {
        filteredfutureprojects = futureprojects;
    }
    renderfutureprojects(filteredfutureprojects);
}

filterfutureprojects('all');
