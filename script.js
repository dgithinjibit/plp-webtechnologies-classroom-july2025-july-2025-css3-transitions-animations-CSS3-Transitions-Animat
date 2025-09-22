const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');
const gameMessage = document.getElementById('game-message');
const pauseButton = document.getElementById('pause-btn');

let birdTopPosition = 100;
let birdLeftPosition = 60;
let gravity = 2.5;
let flapStrength = 50;
let forwardSpeed = 2;
let gameLoopInterval;
let isGameOver = false;
let isPaused = false;

function isOutOfBounds(position) {
    const gameHeight = gameContainer.clientHeight;
    return position < 0 || position > gameHeight - bird.clientHeight;
}

function hasWon() {
    const gameWidth = gameContainer.clientWidth;
    return birdLeftPosition > gameWidth - bird.clientWidth;
}

function flap() {
    if (isGameOver || isPaused) return;
    birdTopPosition -= flapStrength;
    bird.style.transform = 'rotate(-20deg)';
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        gameMessage.textContent = "PAUSED";
        pauseButton.textContent = "Resume";
    } else {
        gameMessage.textContent = "";
        pauseButton.textContent = "Pause";
    }
}

function resetGame() {
    gameContainer.classList.remove('win-animation');
    birdTopPosition = 100;
    birdLeftPosition = 60;
    isGameOver = false;
    isPaused = false;
    gameMessage.textContent = "Press the Spacebar to Flap!";
    gameMessage.style.color = "#f0f0f0";
    bird.style.transform = 'rotate(0deg)';
    pauseButton.textContent = "Pause";
    startGame();
}

function gameLoop() {
    if (isGameOver) {
        clearInterval(gameLoopInterval);
        return;
    }

    if (isPaused) {
        return;
    }

    birdTopPosition += gravity;
    birdLeftPosition += forwardSpeed;
    bird.style.top = `${birdTopPosition}px`;
    bird.style.left = `${birdLeftPosition}px`;

    if (isOutOfBounds(birdTopPosition)) {
        gameMessage.textContent = "GAME OVER! Press 'R' to Restart.";
        gameMessage.style.color = "#f44336";
        isGameOver = true;
    }

    if (hasWon()) {
        gameMessage.textContent = "YOU WIN! Press 'R' to Play Again.";
        gameMessage.style.color = "#4CAF50";
        isGameOver = true;
        gameContainer.classList.add('win-animation');
    }

    setTimeout(() => {
        if (!isGameOver) bird.style.transform = 'rotate(0deg)';
    }, 150);
}

function startGame() {
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
    gameLoopInterval = setInterval(gameLoop, 20);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        flap();
    }
    if (event.code === 'KeyR' && isGameOver) {
        resetGame();
    }
});

pauseButton.addEventListener('click', togglePause);

startGame();
