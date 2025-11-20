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

let players = [];

submit.addEventListener("click", function() {
    console.log("players:");
    players.push(player.value);
    players.forEach(player_name => {
        console.log(`- ${player_name}`);
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
    players = [
        "player 1",
        "player 2",
        "player 3",
        "player 4",
        "player 5",
        "player 6",
        "player 7",
        "player 8",
        "player 9",
        "player 10",
    ];

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
            cardImg.src = "https://images.halloweencostumes.com.au/products/88551/2-1-310707/adult-jinxed-jester-clown-costume-alt-2.jpg";
        } else {
            card.innerText = cards[randomKey]["name"];
            cardImg.src = `https://clash-royale-wordle.com${cards[randomKey]["img"]}`;
        }
        
        playersViewed++;
        
        if (playersViewed >= players.length) {
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