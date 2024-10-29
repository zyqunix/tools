const themeToggle = document.getElementById('themeToggle');
const topbar = document.getElementById('topbar')
const toolContainer = document.getElementById('tool-div')
const visit = document.getElementById('visit')
const welcome = document.getElementById('welcome')
const homeButton = document.getElementById('home')

let isLightMode = false;

themeToggle.addEventListener('click', function() {
    if (!isLightMode) {
        document.body.style.backgroundColor = '#C8C8C8';
        topbar.style.backgroundColor = "#B0B0B0";
        topbar.style.borderColor = "#aeaeae";


        home.style.backgroundColor = "#909090";
        home.style.borderColor = "#858585";


        toolContainer.style.backgroundColor = "#B0B0B0";
        toolContainer.style.borderColor = "#A5A5A5";
        isLightMode = true;

        let children = toolContainer.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.color = "#1E1E1E";
        }

        let welcomeChildren = welcome.querySelectorAll('*');
        for (let o = 0; o< welcomeChildren.length; o++) {
            welcomeChildren[o].style.color = "#1E1E1E";
        }

        visit.style.backgroundColor = "#8CC8A5";
        visit.style.borderColor = "#A0DCB9";

        themeToggle.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="#141414"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3C11 2.44772 11.4477 2 12 2Z" fill="#141414"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L17.7071 7.70711C17.3166 8.09763 16.6834 8.09763 16.2929 7.70711C15.9024 7.31658 15.9024 6.68342 16.2929 6.29289L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289Z" fill="#141414"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 11.4477 18.4477 11 19 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19C18.4477 13 18 12.5523 18 12Z" fill="#141414"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z" fill="#141414"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C12.5523 18 13 18.4477 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19C11 18.4477 11.4477 18 12 18Z" fill="#141414"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.70711 16.2929C8.09763 16.6834 8.09763 17.3166 7.70711 17.7071L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.68342 4.29289 18.2929L6.29289 16.2929C6.68342 15.9024 7.31658 15.9024 7.70711 16.2929Z" fill="#141414"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 11.4477 2.44772 11 3 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H3C2.44772 13 2 12.5523 2 12Z" fill="#141414"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#141414"></path>
        </g></svg>`;

    } else {
        isLightMode = false;

        document.body.style.backgroundColor = '#2a2a2a';

        home.style.backgroundColor = "#4b4b4b";
        home.style.borderColor = "#505050";

        let children = toolContainer.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.color = "#f0f0f0";
        }

        let welcomeChildren = welcome.querySelectorAll('*');
        for (let o = 0; o< welcomeChildren.length; o++) {
            welcomeChildren[o].style.color = "#f0f0f0";
        }

        topbar.style.backgroundColor = "rgba(59, 59, 59, 0.885)";
        topbar.style.borderColor = "#505050";

        toolContainer.style.backgroundColor = "#4b4b4b";
        toolContainer.style.borderColor = "#505050";

        visit.style.backgroundColor = "#3c7855";
        visit.style.borderColor = "#4b8764";

        themeToggle.innerHTML = `<svg fill="#747474" height="24" width="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 472.618 472.618" xml:space="preserve" style="--darkreader-inline-fill: #000000;" data-darkreader-inline-fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M380.525,337.291c-135.427,0-245.302-109.773-245.302-245.302c0-32.502,6.338-63.575,17.991-91.988 C63.372,36.286,0,124.39,0,227.315c0,135.427,109.875,245.302,245.302,245.302c102.923,0,191.029-63.472,227.316-153.315 C444.201,330.954,413.129,337.291,380.525,337.291z"></path> </g> </g> </g></svg>`;

    }
});
