const options = document.getElementById("options");
const amount = document.getElementById("amount");
const fetchBtn = document.getElementById("fetch");
const output = document.getElementById("output");

fetchBtn.addEventListener("click", async function() {
    await fetchData(options.value, amount.value);
});

async function fetchData(type, amount) {
    let body;

    if (type === "layer2") {
        const layers = Array.from({length: amount}, (_, i) => 
            `l${i}: layer(amount: 1, minDim: 0, maxDim: 200){texts}`
        );
        body = JSON.stringify({ query: `{${layers.join(" ")}}` });
    } else {
        body = JSON.stringify({ query: `{${type}(amount: ${amount})}` });
    }

    const res = await fetch("https://api.yyyyyyy.info/", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 8c33411c58a2d7d0d598e2de2542838c",
            "Content-Type": "application/json",
            "accept": "*/*",
            "authtoken": "8c33411c58a2d7d0d598e2de2542838c"
        },
        body
    });
    const data = await res.json();
    console.log(data);

    output.innerHTML = "";

    if (type === "layer2") {
        Object.values(data.data).forEach(layer => {
            layer.texts.forEach(text => {
                const p = document.createElement("p");
                p.innerHTML = text;
                output.appendChild(p);
            });
        });
    } else {
        const list = data.data[type];
        list.forEach(el => {
            let element;
            if (type === "background") {
                element = document.createElement("img");
                element.src = `https://files.yyyyyyy.info/${el}`;
            } else {
                element = document.createElement("video");
                element.src = `https://files.yyyyyyy.info/${el}`;
                element.controls = true;
            }
            output.appendChild(element);
        });
    }
}
