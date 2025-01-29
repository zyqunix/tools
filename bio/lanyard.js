lanyard({
    userId: "1201415921802170388",
}).then(data => {
    const status = document.getElementById('status');
    const nameDiv = document.getElementById('name');
    const customStatus = data.activities.find(activity => activity.type === 4);

    const statusColors = {
        online: "#23a55a",
        idle: "#f0b232",
        dnd: "#f23f43",
        offline: "#80848e"
    };

    const borderColor = statusColors[data.discord_status] || offline;
    status.style.background = `${borderColor}`;

    if (customStatus) {
        nameDiv.setAttribute("data-tooltip", customStatus.state);
    } else {
        nameDiv.setAttribute("data-tooltip", "No custom status");
    }

})