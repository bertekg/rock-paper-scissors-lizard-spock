const winMessage = '&#128512; You win &#128512;'
const loseMessage = '&#128542; You lose &#128542;';
const tieMessage = '&#128528; Tie &#128528;';

let isAutoPlaying = false;
let intervalId;
let duringRequestReset = false;

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    if (playerMove === computerMove) {
        result = tieMessage;
    } else if (playerMove === 'rock') {
        if (computerMove == 'paper' || computerMove == 'spock') {
            result = loseMessage;
        } else if (computerMove == 'scissors' || computerMove == 'lizard') {
            result = winMessage;
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock' || computerMove == 'spock') {
            result = winMessage;
        } else if (computerMove == 'scissors' || computerMove == 'lizard') {
            result = loseMessage;
        }
    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock' || computerMove == 'spock') {
            result = loseMessage;
        } else if (computerMove == 'paper' || computerMove == 'lizard') {
            result = winMessage;
        }
    } else if (playerMove === 'lizard') {
        if (computerMove === 'rock' || computerMove == 'scissors') {
            result = loseMessage;
        } else if (computerMove == 'paper' || computerMove == 'spock') {
            result = winMessage;
        }
    } else if (playerMove === 'spock') {
        if (computerMove === 'paper' || computerMove == 'lizard') {
            result = loseMessage;
        } else if (computerMove == 'scissors' || computerMove == 'rock') {
            result = winMessage;
        }
    }

    if (result === winMessage) {
        score.wins++;
    } else if (result === loseMessage) {
        score.losses++;
    } else if (result === tieMessage) {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `
  You <img src="graphics/${playerMove}.svg" class="move-result-icon"> vs <img src="graphics/${computerMove}.svg" class="move-result-icon"> Computer`;
    updateScoreElement();
}
function pickComputerMove() {
    const randomNumber = Math.floor(Math.random() * 5);
    let computerMove = '';
    if (randomNumber === 0) {
        computerMove = 'rock';
    } else if (randomNumber === 1) {
        computerMove = 'paper';
    } else if (randomNumber === 2) {
        computerMove = 'scissors';
    } else if (randomNumber === 3) {
        computerMove = 'lizard';
    }
    else if (randomNumber === 4) {
        computerMove = 'spock';
    }
    return computerMove;
}
function updateScoreElement() {
    document.querySelector('.js-score').innerHTML =
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');

    document.querySelector('.js-result').innerHTML = 'Reset score done!';
    document.querySelector('.js-moves').innerHTML = '';
    updateScoreElement();
}

function autoPlay() {
    isAutoPlaying = !isAutoPlaying;

    if (isAutoPlaying) {
        intervalId = setInterval(() => {
            const fakePlayerMove = pickComputerMove();
            playGame(fakePlayerMove);
        }, 1000);
        document.querySelector(".js-auto-play-button").innerHTML = 'Stop Auto Play';
    } else {
        clearInterval(intervalId);
        document.querySelector(".js-auto-play-button").innerHTML = 'Start Auto Play';
    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.querySelector('.js-lizard-button').addEventListener('click', () => {
    playGame('lizard');
});

document.querySelector('.js-spock-button').addEventListener('click', () => {
    playGame('spock');
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    requestReset();
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    autoPlay();
});

document.body.addEventListener('keydown', (event) => {
    switch (event.key) {
        case '1':
            playGame('rock');
            break;
        case '2':
            playGame('paper');
            break;
        case '3':
            playGame('scissors');
            break;
        case '4':
            playGame('lizard');
            break;
        case '5':
            playGame('spock');
            break;
        case ' ':
        case 'Enter':
            autoPlay();
            break;
        case 'Backspace':
            requestReset();
            break;
        case 'y':
            performReset();
            break;
        case 'n':
            cancelReset();
            break;
    }
});

function requestReset() {
    document.querySelector('.js-resetconfirmation').innerHTML = `
    Are you sure you want to reset the score?
    <button class="reset-confrimation-button" onclick="performReset();">Yes</button>
    <button class="reset-confrimation-button" onclick="cancelReset();">No</button>`
    duringRequestReset = true;
}

function performReset() {
    if (!duringRequestReset) return;
    resetScore();
    cancelReset();
}

function cancelReset() {
    if (!duringRequestReset) return;
    document.querySelector('.js-resetconfirmation').innerHTML = '';
    duringRequestReset = false;
}
