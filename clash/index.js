import { cards } from './cards.js';

const player = document.getElementById("input");
const submit = document.getElementById("submit");
const start = document.getElementById("start");

const randPlayerEl = document.getElementById("random-player");
const card = document.getElementById("card"); 
const giveUp = document.getElementById("giveup");
const nextPlayer = document.getElementById("next-player");
const cardImg = document.getElementById("card-img")

let nextPlayerHandler, giveUpHandler;

//let players = ["player 1", "player 2", "player 3", "player 4", "player 5", "player 6"];
let players = [];

submit.addEventListener("click", function() {
    console.log("players:");
    players.push(player.value);
    players.forEach(player_name => {
        console.log(`- ${player_name}`);
        document.getElementById("players-summary").innerHTML += `${player_name}<br>`;
    })
    if (player.value != "") {
        document.getElementById("addedplayer").innerText = `${player.value} added`;
    } else {
        document.getElementById("addedplayer").innerText = `Add a player name!`;
    }
    

    player.value = "";
    
})

start.addEventListener("click", function() {
    document.getElementById("addedplayer").style.display = "none";
    
    if (players.length < 3) {
        card.innerText = "Enter more than 2 players";
        return;
    }

    const imposter = players[Math.floor(Math.random() * players.length)];
    nextPlayer.disabled = false;
    submit.disabled = true;
    start.disabled = true;
    giveUp.disabled = false;
    player.disabled = true;
    const randomKey = Object.keys(cards)[Math.floor(Math.random() * Object.keys(cards).length)];

    let currentPlayerIndex = 0;
    let playersViewed = 0;

    if (nextPlayerHandler) {
        nextPlayer.removeEventListener("click", nextPlayerHandler);
    }

    if (giveUpHandler) {
        giveUp.removeEventListener("click", giveUpHandler);
    }

    nextPlayerHandler = function() {
        let current = players[currentPlayerIndex];
        randPlayerEl.innerText = current;
        
        if (current === imposter) {
            cardImg.src = "";
            card.innerText = `Imposter: ${cards[randomKey]["type"]}`;
            cardImg.src = "./img/imposter.jpg";
        } else {
            card.innerText = cards[randomKey]["name"];
            cardImg.src = `https://clash-royale-wordle.com${cards[randomKey]["img"]}`;
        }
        
        playersViewed++;
        
        if (playersViewed == players.length + 1) {
            nextPlayer.disabled = true;
            cardImg.src = "";
            randPlayerEl.style.display = "none";
            document.querySelector(".game-main").style.filter = "blur(0px)";
            card.innerText = `${players[Math.floor(Math.random() * players.length)]} starts the game!`;
        } else {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        }
    };

    let giveup = function() {
        document.getElementById("imposter").innerText = `${imposter} was the imposter!`;
        nextPlayer.disabled = true;
    }

    nextPlayer.addEventListener("click", nextPlayerHandler);
    giveUp.addEventListener("click", giveup);
});

