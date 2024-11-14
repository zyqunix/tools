// CONSTANT VARIABLES

const lmbReset = document.getElementById('lmbReset');
const rmbReset = document.getElementById('rmbReset');
const mmbReset = document.getElementById('mmbReset')
const themeToggle = document.getElementById('themeToggle');
const help = document.getElementById('help');
const container = document.getElementById('container');
const seperator = document.getElementById('seperator');

// CHANGING VARIABLES FOR COUNTERS AND LIGHT/DARK MODE
let leftCount = 0;
let rightCount = 0;
let middleCount = 0;
let isLightMode = false;

// DISABLES ADDING VALUES TO THE COUNTERS WHEN PRESSING BUTTONS 
document.addEventListener('click', function (event) {
    if (event.button === 0 && event.target.tagName !== 'BUTTON') {
        leftCount++;
        document.getElementById('leftClickCount').innerText = leftCount;
    }
});

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    if (event.target.tagName !== 'BUTTON') {
        rightCount++;
        document.getElementById('rightClickCount').innerText = rightCount;
    }
});

document.addEventListener('mousedown', function (event) {
    if (event.button === 1 && event.target.tagName !== 'BUTTON') {
        middleCount++;
        document.getElementById('middleClickCount').innerText = middleCount;
    }
});

help.addEventListener('click', function () {
    alert('SHIFT+RMB only works on Gecko browsers (Firefox, Librewolf, Waterfox, etc) and NOT on Chromium browsers (Chrome, Edge, Brave, Vivaldi). Please understand, that this is not my issue, but the browser\'s.')
})

// RESETS COUNTERS
lmbReset.addEventListener('click', function () {
    leftCount = 0;
    document.getElementById('leftClickCount').innerText = leftCount;
});

rmbReset.addEventListener('click', function () {
    rightCount = 0;
    document.getElementById('rightClickCount').innerText = rightCount;
});

mmbReset.addEventListener('click', function () {
    middleCount = 0;
    document.getElementById('middleClickCount').innerText = middleCount;
});

// LIGHT/DARK MODE LOGIC (this is extremely bad but whatever.. "If it ain't broke, don't fix it." - Wise Man)
themeToggle.addEventListener('click', function() {
    if (!isLightMode) {

        /*
            LIGHT MODE
            LIGHT MODE
            LIGHT MODE
        */

        document.body.style.backgroundColor = '#C8C8C8';
        container.style.backgroundColor = "#B0B0B0";
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
        container.style.color = "#1E1E1E"
        seperator.style.backgroundColor = "#1E1E1E";
        isLightMode = true;
        document.getElementById('github').innerHTML = `<svg width="32px" height="32px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#141414" style="--darkreader-inline-fill: #141414;" data-darkreader-inline-fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title><desc>Created with Sketch.</desc><defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="f4f4f4" fill-rule="evenodd" style="--darkreader-inline-stroke: none;" data-darkreader-inline-stroke=""> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#141414" style="--darkreader-inline-fill: #000000;" data-darkreader-inline-fill=""> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>    `;
        document.getElementById('web').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="2 2 28 28"><path fill="#141414" d="M11 16c0-1.393.078-2.734.222-4h9.556c.144 1.266.222 2.607.222 4c0 1.393-.078 2.734-.222 4h-9.556A35.485 35.485 0 0 1 11 16Zm-1.79 4A37.618 37.618 0 0 1 9 16c0-1.379.073-2.72.21-4H2.58A14.002 14.002 0 0 0 2 16c0 1.39.203 2.733.58 4h6.63Zm-5.863 2h6.138c.314 1.86.771 3.547 1.344 4.978c.369.922.793 1.758 1.272 2.472A14.036 14.036 0 0 1 3.347 22Zm8.168 0h8.97c-.29 1.6-.69 3.032-1.17 4.235c-.516 1.288-1.104 2.262-1.706 2.9c-.6.634-1.144.865-1.609.865c-.465 0-1.009-.231-1.609-.866c-.602-.637-1.19-1.611-1.705-2.899c-.481-1.203-.881-2.636-1.171-4.235Zm11 0c-.314 1.86-.771 3.547-1.344 4.978c-.369.922-.793 1.758-1.272 2.472A14.036 14.036 0 0 0 28.653 22h-6.138Zm6.905-2c.377-1.267.58-2.61.58-4c0-1.39-.203-2.733-.58-4h-6.63c.137 1.28.21 2.621.21 4s-.073 2.72-.21 4h6.63ZM19.314 5.765c.481 1.203.881 2.636 1.171 4.235h-8.97c.29-1.6.69-3.032 1.17-4.235c.516-1.288 1.104-2.263 1.706-2.9c.598-.631 1.14-.863 1.604-.865h.008c.464 0 1.007.233 1.606.866c.602.636 1.19 1.611 1.705 2.899ZM22.515 10h6.138a14.036 14.036 0 0 0-8.754-7.45c.479.714.903 1.55 1.272 2.472c.573 1.431 1.03 3.118 1.344 4.978ZM3.347 10h6.138c.314-1.86.771-3.547 1.344-4.978c.369-.922.793-1.758 1.272-2.472A14.036 14.036 0 0 0 3.347 10Z"></path></svg>`;
        document.getElementById('help').innerHTML = `<svg height="32px" width="32px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#141414" style="--darkreader-inline-fill: #000000;" data-darkreader-inline-fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#141414;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M255.992,0.008C114.626,0.008,0,114.626,0,256s114.626,255.992,255.992,255.992 C397.391,511.992,512,397.375,512,256S397.391,0.008,255.992,0.008z M300.942,373.528c-10.355,11.492-16.29,18.322-27.467,29.007 c-16.918,16.177-36.128,20.484-51.063,4.516c-21.467-22.959,1.048-92.804,1.597-95.449c4.032-18.564,12.08-55.667,12.08-55.667 s-17.387,10.644-27.709,14.419c-7.613,2.782-16.225-0.871-18.354-8.234c-1.984-6.822-0.404-11.161,3.774-15.822 c10.354-11.484,16.289-18.314,27.467-28.999c16.934-16.185,36.128-20.483,51.063-4.524c21.467,22.959,5.628,60.732,0.064,87.497 c-0.548,2.653-13.742,63.627-13.742,63.627s17.387-10.645,27.709-14.427c7.628-2.774,16.241,0.887,18.37,8.242 C306.716,364.537,305.12,368.875,300.942,373.528z M273.169,176.123c-23.886,2.096-44.934-15.564-47.031-39.467 c-2.08-23.878,15.58-44.934,39.467-47.014c23.87-2.097,44.934,15.58,47.015,39.458 C314.716,152.979,297.039,174.043,273.169,176.123z"></path> </g> </g></svg>`;

        let children = container.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.color = "#1E1E1E";
        }

        rmbReset.style.backgroundColor = "#1E1E1E";
        lmbReset.style.backgroundColor = "#1E1E1E";
        mmbReset.style.backgroundColor = "#1E1E1E";
        rmbReset.style.color = "#b0b0b0";
        lmbReset.style.color = "#b0b0b0";
        mmbReset.style.color = "#b0b0b0";


    } else {

         /*
            DARK MODE
            DARK MODE
            DARK MODE
        */

        let children = container.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.color = "#f0f0f0";
        }
        document.body.style.backgroundColor = '#2a2a2a';
        themeToggle.innerHTML = `<svg fill="#747474" height="24" width="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 472.618 472.618" xml:space="preserve" style="--darkreader-inline-fill: #000000;" data-darkreader-inline-fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M380.525,337.291c-135.427,0-245.302-109.773-245.302-245.302c0-32.502,6.338-63.575,17.991-91.988 C63.372,36.286,0,124.39,0,227.315c0,135.427,109.875,245.302,245.302,245.302c102.923,0,191.029-63.472,227.316-153.315 C444.201,330.954,413.129,337.291,380.525,337.291z"></path> </g> </g> </g></svg>`;
        isLightMode = false;
        container.style.backgroundColor = "#4b4b4b";
        seperator.style.backgroundColor = "#747474";

        document.getElementById('github').innerHTML = `<svg width="32px" height="32px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f4f4f4" style="--darkreader-inline-fill: #f4f4f4;" data-darkreader-inline-fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title><desc>Created with Sketch.</desc><defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="f4f4f4" fill-rule="evenodd" style="--darkreader-inline-stroke: none;" data-darkreader-inline-stroke=""> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#747474" style="--darkreader-inline-fill: #000000;" data-darkreader-inline-fill=""> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>    `;
        document.getElementById('web').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="2 2 28 28"><path fill="currentColor" d="M11 16c0-1.393.078-2.734.222-4h9.556c.144 1.266.222 2.607.222 4c0 1.393-.078 2.734-.222 4h-9.556A35.485 35.485 0 0 1 11 16Zm-1.79 4A37.618 37.618 0 0 1 9 16c0-1.379.073-2.72.21-4H2.58A14.002 14.002 0 0 0 2 16c0 1.39.203 2.733.58 4h6.63Zm-5.863 2h6.138c.314 1.86.771 3.547 1.344 4.978c.369.922.793 1.758 1.272 2.472A14.036 14.036 0 0 1 3.347 22Zm8.168 0h8.97c-.29 1.6-.69 3.032-1.17 4.235c-.516 1.288-1.104 2.262-1.706 2.9c-.6.634-1.144.865-1.609.865c-.465 0-1.009-.231-1.609-.866c-.602-.637-1.19-1.611-1.705-2.899c-.481-1.203-.881-2.636-1.171-4.235Zm11 0c-.314 1.86-.771 3.547-1.344 4.978c-.369.922-.793 1.758-1.272 2.472A14.036 14.036 0 0 0 28.653 22h-6.138Zm6.905-2c.377-1.267.58-2.61.58-4c0-1.39-.203-2.733-.58-4h-6.63c.137 1.28.21 2.621.21 4s-.073 2.72-.21 4h6.63ZM19.314 5.765c.481 1.203.881 2.636 1.171 4.235h-8.97c.29-1.6.69-3.032 1.17-4.235c.516-1.288 1.104-2.263 1.706-2.9c.598-.631 1.14-.863 1.604-.865h.008c.464 0 1.007.233 1.606.866c.602.636 1.19 1.611 1.705 2.899ZM22.515 10h6.138a14.036 14.036 0 0 0-8.754-7.45c.479.714.903 1.55 1.272 2.472c.573 1.431 1.03 3.118 1.344 4.978ZM3.347 10h6.138c.314-1.86.771-3.547 1.344-4.978c.369-.922.793-1.758 1.272-2.472A14.036 14.036 0 0 0 3.347 10Z"></path></svg>`;
        document.getElementById('help').innerHTML = `<svg height="32px" width="32px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#747474" style="--darkreader-inline-fill: #000000;" data-darkreader-inline-fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#747474;} </style><style class="darkreader darkreader--sync" media="screen"></style> <g> <path class="st0" d="M255.992,0.008C114.626,0.008,0,114.626,0,256s114.626,255.992,255.992,255.992 C397.391,511.992,512,397.375,512,256S397.391,0.008,255.992,0.008z M300.942,373.528c-10.355,11.492-16.29,18.322-27.467,29.007 c-16.918,16.177-36.128,20.484-51.063,4.516c-21.467-22.959,1.048-92.804,1.597-95.449c4.032-18.564,12.08-55.667,12.08-55.667 s-17.387,10.644-27.709,14.419c-7.613,2.782-16.225-0.871-18.354-8.234c-1.984-6.822-0.404-11.161,3.774-15.822 c10.354-11.484,16.289-18.314,27.467-28.999c16.934-16.185,36.128-20.483,51.063-4.524c21.467,22.959,5.628,60.732,0.064,87.497 c-0.548,2.653-13.742,63.627-13.742,63.627s17.387-10.645,27.709-14.427c7.628-2.774,16.241,0.887,18.37,8.242 C306.716,364.537,305.12,368.875,300.942,373.528z M273.169,176.123c-23.886,2.096-44.934-15.564-47.031-39.467 c-2.08-23.878,15.58-44.934,39.467-47.014c23.87-2.097,44.934,15.58,47.015,39.458 C314.716,152.979,297.039,174.043,273.169,176.123z"></path> </g> </g></svg>`;
        
        rmbReset.style.backgroundColor = "#b0b0b0";
        lmbReset.style.backgroundColor = "#b0b0b0";
        mmbReset.style.backgroundColor = "#b0b0b0";        
        rmbReset.style.color = "#2a2a2a";
        lmbReset.style.color = "#2a2a2a";
        mmbReset.style.color = "#2a2a2a";

    }
});
