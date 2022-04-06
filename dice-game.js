"use strict";

// selecting Elements
const switchPlayers = document.querySelector("#switch-players");

const player0El = document.querySelector("#player-0");
const player1El = document.querySelector("#player-1");

const player0Screen = document.querySelector("#screen-0");
const player1Screen = document.querySelector("#screen-1");

const score0El = document.querySelector("#score-0");
const score1El = document.querySelector("#score-1");

const current0El = document.querySelector("#current-0");
const current1El = document.querySelector("#current-1");

const dice0El = document.querySelector(".dice-0");
const dice1El = document.querySelector(".dice-1");

const btn0New = document.querySelector(".btn-new-0");
const btn1New = document.querySelector(".btn-new-1");

const btn0Roll = document.querySelector(".btn-roll-0");
const btn1Roll = document.querySelector(".btn-roll-1");

const btn0Hold = document.querySelector(".btn-hold-0");
const btn1Hold = document.querySelector(".btn-hold-1");

// starting condition
let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];

    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    switchPlayers.classList.remove("player-active");

    dice0El.classList.add("hidden");
    dice1El.classList.add("hidden");

    player0Screen.classList.remove("player-winner");
    player1Screen.classList.remove("player-winner");

    player0El.classList.add("player-active");
    player1El.classList.remove("player-active");

    player0El.classList.remove("player-inactive");
    player1El.classList.add("player-inactive");

    player0Screen.classList.add("player-active");
    player1Screen.classList.remove("player-active");

    btn0Roll.classList.remove("player-inactive");
    btn1Roll.classList.add("player-inactive");

    btn0Hold.classList.remove("player-inactive");
    btn1Hold.classList.add("player-inactive");
};
init();

const switchPlayer = function () {
    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    switchPlayers.classList.toggle("player-active");

    btn0Roll.classList.toggle("player-inactive");
    btn1Roll.classList.toggle("player-inactive");
    btn0Hold.classList.toggle("player-inactive");
    btn1Hold.classList.toggle("player-inactive");

    // document.querySelector(`#current-${activePlayer}`).textContent = `You'r turn.`;

    player0El.classList.toggle("player-active");
    player1El.classList.toggle("player-active");

    player0El.classList.toggle("player-inactive");
    player1El.classList.toggle("player-inactive");

    player0Screen.classList.toggle("player-active");
    player1Screen.classList.toggle("player-active");
};

function btnRoll() {
    if (playing) {
        // 1. generating radom dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // // 2. display dice
        document.querySelector(`.dice-${activePlayer}`).classList.remove("hidden"); ////
        document.querySelector(`.dice-${activePlayer}`).src = `./dice-game-img/dice-${dice}.png`; ////

        // 3. check for rolled 1: if true to next player
        if (dice !== 1) {
            // add dice to the current score
            currentScore += dice;

            document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
        }
        // else if (dice == 1) {
        //     document.querySelector(`#current-${activePlayer}`).textContent = "you rolled 1 Try next turn.";
        // }
        else {
            // swich to next player
            switchPlayer();
        }
    }
}

function btnHold() {
    if (playing && currentScore > 0) {
        // 1. add current score to active player's score
        scores[activePlayer] += currentScore;

        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            // finish the game
            playing = false;

            document.querySelector(`#screen-${activePlayer}`).classList.add("player-winner");
            // document.querySelector(`#screen-${activePlayer}`).classList.remove("player-active");
        } else {
            // switch to the next player
            switchPlayer();
        }
    } else {
        // document.querySelector(`#current-${activePlayer}`).textContent = "Roll the dice !";
    }
}

function btnNew() {
    init();
}
