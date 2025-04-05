const lookupElem = document.getElementById('lookupElem');
const yourIp = document.getElementById('your-ip');

function getFlagEmoji(countryCode) {
	return countryCode
		.toUpperCase()
		.replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}

function fetchIp() {
	const ip = document.getElementById("ipInput").value;
	fetch(`https://ipapi.co/${ip}/json/`)
		.then(response => response.json())
		.then(data => {
			const flag = getFlagEmoji(data.country_code || '');
			const table = `
				<table>
					<tr><th>IP</th><td>${data.ip}</td></tr>
					<tr><th>City</th><td>${data.city}</td></tr>
					<tr><th>Postal Code</th><td>${data.postal}</td></tr>
					<tr><th>Region</th><td>${data.region}</td></tr>
					<tr><th>Country</th><td>${flag} ${data.country_name} (${data.country_code})</td></tr>
					<tr><th>Timezone</th><td>${data.timezone}</td></tr>
					<tr><th>Organization</th><td>${data.org}</td></tr>
					<tr><th>Coordinates</th><td>${data.latitude}, ${data.longitude}</td></tr>
				</table>
			`;
			document.getElementById("output").innerHTML = table;
		})
		.catch(err => {
			document.getElementById("output").textContent = "Error: " + err;
		});
}

function getYour() {
    fetch(`https://ipapi.co/json/?ip=ipv4`)
        .then(response => response.json())
        .then(data => {
            yourIp.innerHTML = data.ip;
        })
        .catch(err => {
            yourIp.textContent = "Error: " + err;
        });
}

window.addEventListener('load', getYour);

lookupElem.addEventListener('click', fetchIp);
