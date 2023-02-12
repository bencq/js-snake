// Game Constants
const canvas = document.getElementById("snakeGameCanvas");
const ctx = canvas.getContext("2d");
const boxSize = 20;
let snake = [];
let food = {
    x: null,
    y: null,
};

let direction;

// Game Initialization
function init() {
    snake = [{
        x: 9 * boxSize,
        y: 10 * boxSize,
    }];
}


// Functions for drawing the game elements
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }
}

function drawFood() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    ctx.strokeStyle = "red";
    ctx.strokeRect(food.x, food.y, boxSize, boxSize);
}

// Function for placing a random food item
function getRandomFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * boxSize;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * boxSize;
}

// Function to update the snake's position
function updateSnakePosition() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch (direction) {
        case "right":
            snakeX += boxSize;
            break;
        case "left":
            snakeX -= boxSize;
            break;
        case "up":
            snakeY -= boxSize;
            break;
        case "down":
            snakeY += boxSize;
            break;
        default:
            break;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    snake.unshift(newHead);

    if (snake[0].x === food.x && snake[0].y === food.y) {
        getRandomFood();
    } else {
        snake.pop();
    }
}

// Check for game over conditions
function checkGameOver() {
    if (
        snake[0].x < 0 ||
        snake[0].x > canvas.width ||
        snake[0].y < 0 ||
        snake[0].y > canvas.height
    ) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Track KeyPress Events
document.addEventListener("keydown", directionKeyPressed);

function directionKeyPressed(e) {
    switch (e.keyCode) {
        case 38:
            if(direction != "down") direction = "up";
            break;
        case 40:
            if(direction != "up") direction = "down";
            break;
        case 37:
            if(direction != "right") direction = "left";
            break;
        case 39:
            if(direction != "left") direction = "right";
            break;
        default:
            break;
    }
}

// Main game loop
function gameLoop() {
    if (checkGameOver()) {
        clearInterval(gameLoopInterval);
        alert("Game Over!");
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    updateSnakePosition();
    drawSnake();
}

// Start the game
let gameLoopInterval = setInterval(gameLoop, 100);
getRandomFood();
init()
