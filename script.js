const car = document.getElementById('car');
const obstacle = document.getElementById('obstacle');
const startBtn = document.getElementById('startBtn');
const scoreDisplay = document.getElementById('score');
let score = 0;
let gameInterval;
let obstacleSpeed = 5;

startBtn.addEventListener('click', startGame);

function startGame() {
    score = 0;
    obstacle.style.top = '-100px';
    startBtn.style.display = 'none';
    gameInterval = setInterval(updateGame, 20);
    document.addEventListener('keydown', moveCar);
}

function updateGame() {
    const carRect = car.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (obstacleRect.top > 500) {
        obstacle.style.top = '-100px';
        obstacle.style.left = Math.floor(Math.random() * 250) + 'px';
        score++;
        scoreDisplay.textContent = `Puntuación: ${score}`;
    } else {
        obstacle.style.top = obstacleRect.top + obstacleSpeed + 'px';
    }

    if (collision(carRect, obstacleRect)) {
        endGame();
    }
}

function moveCar(e) {
    const carRect = car.getBoundingClientRect();
    if (e.key === 'ArrowLeft' && carRect.left > 0) {
        car.style.left = carRect.left - 10 + 'px';
    }
    if (e.key === 'ArrowRight' && carRect.right < 300) {
        car.style.left = carRect.left + 10 + 'px';
    }
}

function collision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function endGame() {
    clearInterval(gameInterval);
    startBtn.style.display = 'block';
    alert(`Juego terminado. Puntuación: ${score}`);
    document.removeEventListener('keydown', moveCar);
}
