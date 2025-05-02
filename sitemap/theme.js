const themeToggle = document.getElementById('themeToggle');
const topbar = document.getElementById('topbar');
const toolContainers = document.querySelectorAll('.tool-div');
const visit = document.getElementById('visit'); 
const welcome = document.getElementById('welcome');

let isLightMode = false;

themeToggle.addEventListener('click', function () {
    if (!isLightMode) {
        isLightMode = true;

        document.body.style.backgroundColor = '#C8C8C8';

        topbar.style.backgroundColor = "#B0B0B0E1";
        topbar.style.borderColor = "#aeaeaeE1";

        toolContainers.forEach(toolContainer => {
            const toolChildren = toolContainer.children;
            for (let i = 0; i < toolChildren.length; i++) {
                toolChildren[i].style.color = "#1E1E1E";
            }
            toolContainers.style.backgroundColor = "#B0B0B0";
            toolContainers.style.borderColor = "#aeaeae";    
        });

        const welcomeChildren = welcome.querySelectorAll('*');
        welcomeChildren.forEach(child => {
            child.style.color = "#1E1E1E";
        });

        if (visit) {
            visit.style.backgroundColor = "#8CC8A5";
            visit.style.borderColor = "#A0DCB9";
        }

        themeToggle.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" fill="#1E1E1E"></circle>
                <path d="M12 2v2" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"></path>
                <path d="M12 20v2" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"></path>
                <path d="M4.22 4.22l1.42 1.42" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"></path>
                <path d="M18.36 18.36l1.42 1.42" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"></path>
                <path d="M2 12h2" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"></path>
                <path d="M20 12h2" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"></path>
                <path d="M4.22 19.78l1.42-1.42" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"></path>
                <path d="M18.36 5.64l1.42-1.42" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"></path>
            </svg>`;

    } else {
        isLightMode = false;

        document.body.style.backgroundColor = '#2a2a2a';

        topbar.style.backgroundColor = "rgba(59, 59, 59, 0.885)";
        topbar.style.borderColor = "#505050E1";

        toolContainers.forEach(toolContainer => {
            const toolChildren = toolContainer.children;
            for (let i = 0; i < toolChildren.length; i++) {
                toolChildren[i].style.color = "#f0f0f0";
                toolChildren[i].style.backgroundColor = ""; 
                toolChildren[i].style.borderColor = "";
            }
        });

        const welcomeChildren = welcome.querySelectorAll('*');
        welcomeChildren.forEach(child => {
            child.style.color = "#f0f0f0";
        });

        if (visit) {
            visit.style.backgroundColor = "#3c7855";
            visit.style.borderColor = "#4b8764";
        }

        themeToggle.innerHTML = `
            <svg fill="#747474" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 472.618 472.618" xml:space="preserve" style="--darkreader-inline-fill: #747474;" data-darkreader-inline-fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M380.525,337.291c-135.427,0-245.302-109.773-245.302-245.302c0-32.502,6.338-63.575,17.991-91.988 C63.372,36.286,0,124.39,0,227.315c0,135.427,109.875,245.302,245.302,245.302c102.923,0,191.029-63.472,227.316-153.315 C444.201,330.954,413.129,337.291,380.525,337.291z"></path> </g> </g> </g></svg>

        `;

    }
});