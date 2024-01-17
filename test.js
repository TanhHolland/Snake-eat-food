// board
var blockSize = 25
var row = 20
var col = 20
var board
var context

// snake
var snakeX = blockSize * 5
var snakeY = blockSize * 5

// food
var foodX
var foodY

//
var velocityX = 0
var velocityY = 0

//
snakeBody = []
window.onload = function() {
    board = document.getElementById('board')
    board.height = row * blockSize
    board.width = col * blockSize
    context = board.getContext('2d')
    
    placeFood()
    document.addEventListener('keyup',changeDirection)
    // update()
    setInterval(update,1000/10)
}
function update() {
    context.fillStyle = 'black'
    context.fillRect(0,0,board.width,board.height)

    context.fillStyle = 'red'
    context.fillRect(foodX,foodY,blockSize,blockSize)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([snakeX,snakeY])
        placeFood()
    }
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX,snakeY]
    }
    context.fillStyle = 'green'
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX,snakeY,blockSize,blockSize)
    for (let i = 0; i<snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
    }
    if (snakeX < 0 || snakeX > col * blockSize || snakeY < 0 || snakeY > row * blockSize) { 
        alert("Game loss")
    }
    for (let i = 0; i<snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            alert('Game over')
        }
    }
}
function placeFood() {
    foodX = Math.floor(Math.random() * col) * blockSize
    foodY = Math.floor(Math.random() * row) * blockSize
}
function changeDirection(e) {
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.code == 'ArrowLeft'&& velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.code == 'ArrowRight'&& velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}