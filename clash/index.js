import { cards } from './cards.js';

const player = document.getElementById("input");
const submit = document.getElementById("submit");
const start = document.getElementById("start");

const randPlayerEl = document.getElementById("random-player");
const card = document.getElementById("card"); 
const giveUp = document.getElementById("giveup");
const nextPlayer = document.getElementById("next-player");
const cardImg = document.getElementById("card-img")

let players = [];

submit.addEventListener("click", function() {
    console.log("players:");
    players.push(player.value);
    players.forEach(player_name => {
        console.log(`- ${player_name}`);
    })
    player.value = "";
})



start.addEventListener("click", function() {
    if (players.length < 3) {
        card.innerText = "Enter more than 2 players";
        return;
    }

    const imposter = players[Math.floor(Math.random() * players.length)];
    nextPlayer.disabled = false;
    submit.disabled = true;
    start.disabled = true;
    giveUp.disabled = false;
    const randomKey = Object.keys(cards)[Math.floor(Math.random() * Object.keys(cards).length)];

    let currentPlayerIndex = 0;

    nextPlayer.addEventListener("click", function() {
        let current = players[currentPlayerIndex];
        randPlayerEl.innerText = current;
        
        if (current === imposter) {
            card.innerText = `Imposter: ${cards[randomKey]["type"]}`;
        } else {
            card.innerText = cards[randomKey]["name"];
        }
        
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    });

    giveUp.addEventListener("click", function() {
        document.getElementById("imposter").innerText = imposter;
    });
});