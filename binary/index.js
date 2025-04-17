const binaryElem = document.getElementById('translate-to-binary');
const textElem = document.getElementById('translate-to-text');


binaryElem.addEventListener("click", () => {
    const text = document.getElementById("textInput").value;
    const binary = text.split("").map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, "0");
    }).join(" ");
    document.getElementById("binaryOutput").value = binary;
});

textElem.addEventListener("click", () => {
    const binary = document.getElementById("binaryOutput").value;
    const text = binary.split(" ").map(bin => {
        return String.fromCharCode(parseInt(bin, 2));
    }).join("");
    document.getElementById("textInput").value = text;
});
