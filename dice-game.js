"use strict";

const playerZero = document.querySelector("#player-0");
const playerOne = document.querySelector("#player-1");

const screenZero = document.querySelector("#screen-0");
const screenOne = document.querySelector("#screen-1");

const totalZero = document.querySelector("#total-0");
const totalOne = document.querySelector("#total-1");

const currentZero = document.querySelector("#current-0");
const currentOne = document.querySelector("#current-1");

const diceZero = document.querySelector(".dice-0");
const diceOne = document.querySelector(".dice-1");

const startZero = document.querySelector("#start-0");
const startOne = document.querySelector("#start-1");

let scores, currentScore, activePlayer, playing;

// set back to starting condition
const init = function () {
    scores = [0, 0];
    playing = false;
    currentScore = 0;

    totalZero.textContent = 0;
    totalOne.textContent = 0;

    currentZero.innerHTML = `<p class="texts-press-start">
                                <span>Press START</span>
                                <span>to PLAY</span>
                            </p>
                            <p class="texts-rules">
                                <span>Ruls</span>
                                <span>Dead Number : 1 & 3</span>
                                <span>Win socre : 20</span>
                            </p>`;
    currentOne.innerHTML = `<p class="texts-press-start">
                                <span>Press START</span>
                                <span>to PLAY</span>
                            </p>
                            <p class="texts-rules">
                                <span>Ruls</span>
                                <span>Dead Number : 1 & 3</span>
                                <span>Win socre : 20</span>
                            </p>`;

    playerZero.classList.remove("winner");
    playerOne.classList.remove("winner");

    playerZero.classList.remove("loser");
    playerOne.classList.remove("loser");

    playerZero.classList.remove("active");
    playerOne.classList.remove("active");

    playerZero.classList.remove("inactive");
    playerOne.classList.remove("inactive");
};
init();

function btnStart(e) {
    if (!playing) {
        // start the game
        playing = true;

        scores = [0, 0];
        currentScore = 0;

        totalZero.textContent = 0;
        totalOne.textContent = 0;
        currentZero.textContent = 0;
        currentOne.textContent = 0;

        if (playerOne.classList.contains("winner") || playerZero.classList.contains("winner")) {
            playerZero.classList.remove("winner");
            playerOne.classList.remove("winner");
            playerZero.classList.remove("loser");
            playerOne.classList.remove("loser");
        }

        if (e != startOne) {
            // select the first player
            activePlayer = 0;

            playerZero.classList.add("active");
            playerOne.classList.add("inactive");
        } else if (e != startZero) {
            // select the first player
            activePlayer = 1;

            playerOne.classList.add("active");
            playerZero.classList.add("inactive");
        }
    }
}

const switchPlayer = function () {
    // switching active player
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    playerZero.classList.toggle("active");
    playerOne.classList.toggle("active");

    playerZero.classList.toggle("inactive");
    playerOne.classList.toggle("inactive");

    playerZero.classList.remove("invalid");
    playerOne.classList.remove("invalid");
};

function btnRoll(e) {
    if (playing && e.id.slice(-1) == activePlayer) {
        // generating radom dice roll & display the dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        document.querySelector(`.dice-${activePlayer}`).src = `./dice-game-img/dice-${dice}.png`;

        // check for rolled 1, if true to next the player
        if (dice !== 1 && dice !== 3) {
            // add dice to the current score
            currentScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
        } else {
            document.querySelector(`#current-${activePlayer}`).innerHTML = `DEAD NUMBER<br>${dice}`;
            document.querySelector(`#player-${activePlayer}`).classList.add("invalid");

            setTimeout(() => {
                // set delay
                document.querySelector(`#player-${activePlayer}`).classList.remove("invalid");
                // swich to next player
                switchPlayer();
            }, 1200);
        }
    }
}

function btnHold(e) {
    if (playing && currentScore > 0 && e.id.slice(-1) == activePlayer) {
        // add current score to active player's score
        scores[activePlayer] += currentScore;

        document.querySelector(`#total-${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 20
        if (scores[activePlayer] >= 20) {
            // if score is <= 30, plaing = false to finish the game
            playing = false;

            playerZero.classList.remove("active");
            playerOne.classList.remove("active");
            playerZero.classList.remove("inactive");
            playerOne.classList.remove("inactive");

            if (scores[0] > scores[1]) {
                playerZero.classList.add("winner");
                currentZero.textContent = `You win!`;

                playerOne.classList.add("loser");
                currentOne.textContent = `You lose!`;
            } else {
                playerOne.classList.add("winner");
                currentOne.textContent = `You win!`;

                playerZero.classList.add("loser");
                currentZero.textContent = `You lose!`;
            }
            setTimeout(() => {
                init();
            }, 10000);

            // switch to the next player
        } else {
            switchPlayer();
        }

        // if rolled 1, display message.
    } else if (playing && !currentScore > 0 && e.id.slice(-1) == activePlayer) {
        document.querySelector(`#current-${activePlayer}`).textContent = "ROLL THE DICE !";
        document.querySelector(`#player-${activePlayer}`).classList.add("invalid");

        // set delay
        setTimeout(() => {
            document.querySelector(`#player-${activePlayer}`).classList.remove("invalid");
            document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
        }, 1200);
    }
}

// reset game by init()
function btnReset(e) {
    if (e.id.slice(-1) == activePlayer) {
        init();
    }
}
