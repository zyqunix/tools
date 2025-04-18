function filterSkins() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const name = row.querySelector("td span")?.textContent.toLowerCase() || "";
        const id = row.querySelector("td code")?.textContent.toLowerCase() || "";

        if (name.includes(input) || id.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}