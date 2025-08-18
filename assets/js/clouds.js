const cloudContainer = document.createElement("div");
cloudContainer.style.position = "fixed";
cloudContainer.style.top = "0";
cloudContainer.style.left = "0";
cloudContainer.style.width = "100vw";
cloudContainer.style.height = "150px";
cloudContainer.style.pointerEvents = "none";
cloudContainer.style.zIndex = "998";
cloudContainer.style.background = "transparent";
cloudContainer.style.backdropFilter = "none";
cloudContainer.id = "deco";
document.body.appendChild(cloudContainer);

const maxClouds = 20;
const clouds = [];

const createCloud = () => {
	if (clouds.length >= maxClouds) return;

	const cloud = document.createElement("div");
	cloud.style.position = "absolute";
	const size = Math.random() * 80 + 100;
	cloud.style.width = `${size}px`;
	cloud.style.height = `${size * 0.6}px`;
	cloud.style.background = "rgba(255, 255, 255, 0.3)";
	cloud.style.borderRadius = `${Math.random() * 51}%`;
	cloud.style.filter = "blur(10px)";
	cloud.style.backdropFilter = "blur(10px)";

	cloud.x = -size;
	cloud.y = Math.random() * 50;
	cloud.speed = Math.random() * 0.3 + 0.1;

	cloud.style.left = `${cloud.x}px`;
	cloud.style.top = `${cloud.y}px`;

	clouds.push(cloud);
	cloudContainer.appendChild(cloud);
};

setInterval(createCloud, 1000);

function updateClouds() {
	clouds.forEach((cloud, index) => {
		cloud.x += cloud.speed;
		cloud.style.left = `${cloud.x}px`;

		if (cloud.x > window.innerWidth) {
			cloudContainer.removeChild(cloud);
			clouds.splice(index, 1);
		}
	});

	requestAnimationFrame(updateClouds);
}

updateClouds();
