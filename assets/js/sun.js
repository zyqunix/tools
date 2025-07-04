const sun = document.createElement("div");
sun.style.position = "fixed";
sun.style.top = "50px";
sun.style.left = "50px";
sun.style.width = "100px";
sun.style.height = "100px";
sun.style.borderRadius = "50%";
sun.style.boxShadow = "0 0 30px 10px rgba(255, 223, 0, 0.7)";
sun.style.pointerEvents = "none";
sun.style.zIndex = "10000";
sun.id = "deco";
document.body.appendChild(sun);



let angle = 0;

function updateSunColor() {
  const hour = new Date().getHours();
  let colors;
  let glowColor;

  if (hour >= 6 && hour < 12) {
    colors = ['#FFDF00', '#FFF8B0', '#FFDF00'];
    glowColor = 'rgba(255, 223, 0, 0.6)';
  } else if (hour >= 12 && hour < 18) {
    colors = ['#FF8C00', '#FFC271', '#FF8C00'];
    glowColor = 'rgba(255, 140, 0, 0.6)';
  } else if (hour >= 18 && hour < 20) {
    colors = ['#FF4500', '#FF8866', '#FF4500'];
    glowColor = 'rgba(255, 69, 0, 0.6)';
  } else {
    colors = ['#A9CCE3', '#D6E6F2', '#A9CCE3'];
    glowColor = 'rgba(169, 204, 227, 0.4)';
  }

  angle = (angle + 0.4) % 360;

  sun.style.background = `radial-gradient(circle at center, ${colors[1]} 0%, ${colors[0]} 60%, ${colors[2]} 100%)`;
  sun.style.transform = `rotate(${angle}deg)`;
  sun.style.boxShadow = `0 0 40px 15px ${glowColor}`;
}

setInterval(updateSunColor, 30);


updateSunColor();
setInterval(updateSunColor, 60 * 1000);
