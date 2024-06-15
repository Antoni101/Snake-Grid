
var maxGrid = 182; //182 Minimum
var gridSpeed = 130;
var specialBlock;
var gameRunning;
var sequence = 13;
var snakeShadow = "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"

var snake = {
    currentBlock: 50,
    direction: "Down",
    body: 0
};

function generateGrid() {
    document.getElementById("startBtn").style.display = "None";
    var game = document.getElementById("game");
    for (let i = 0; i < 182; i++) {
        game.innerHTML += ' <div id="' + i + '" class="grid-block"></div>'
        // game.innerHTML += ' <div id="' + i + '" class="grid-block">' + i + '</div>' //Test
    }
    specialBlock = Math.floor(Math.random() * 183);
    setTimeout(function(){ 
        document.getElementById(specialBlock).style.backgroundColor = "Yellow";
        gameRunning = setInterval(move, gridSpeed);
    }, 2000);
}

function move() {
    checkWall()
    if (snake.direction == "Down") {
        snake.currentBlock += 13;
        document.getElementById(snake.currentBlock - (13 + snake.body)).style.backgroundColor = "White";
        document.getElementById(snake.currentBlock - (13 + snake.body)).style.boxShadow = "None";
    }
    else if (snake.direction == "Right") {
        snake.currentBlock += 1;
        document.getElementById(snake.currentBlock - (1 + snake.body)).style.backgroundColor = "White";
        document.getElementById(snake.currentBlock - (1 + snake.body)).style.boxShadow = "None";
    }
    else if (snake.direction == "Left") {
        snake.currentBlock -= 1;
        document.getElementById(snake.currentBlock + (1 + snake.body)).style.backgroundColor = "White";
        document.getElementById(snake.currentBlock + (1 + snake.body)).style.boxShadow = "None";
    }
    else if (snake.direction == "Up") {
        snake.currentBlock -= 13;
        document.getElementById(snake.currentBlock + (13 + snake.body)).style.backgroundColor = "White";
        document.getElementById(snake.currentBlock + (13 + snake.body)).style.boxShadow = "None";
    }
    if (snake.currentBlock == specialBlock) {
        document.getElementById(snake.currentBlock).style.backgroundColor = "Green";
        clearInterval(gameRunning);
        gridSpeed -= 2;
        setTimeout(function(){ 
            specialBlock = Math.floor(Math.random() * 183);
            document.getElementById(specialBlock).style.backgroundColor = "Yellow";
            setTimeout(function(){ 
                gameRunning = setInterval(move, gridSpeed);
            }, 300);
        }, 400);
    }
    else {
        document.getElementById(snake.currentBlock).style.backgroundColor = "Black";
        document.getElementById(snake.currentBlock).style.boxShadow = snakeShadow;
    }

}

function playerLose() {
    window.location.reload();
}

function checkWall() {
    if (snake.currentBlock > maxGrid || snake.currentBlock < 0) {
        playerLose();
    }
    
    else if (snake.direction == "Right") {
        for (let i = 11; i < 182; i += sequence) {
            if (snake.currentBlock == i) { playerLose() }
        }
    } 
    
    else if (snake.direction == "Left") {
        for (let i = 170; i > 0; i -= sequence) {
            if (snake.currentBlock == i) { playerLose() }
        }
    } 
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'w' || event.key === 'W') {
        snake.direction = "Up"
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'a' || event.key === 'A') {
        snake.direction = "Left"
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 's' || event.key === 'S') {
        snake.direction = "Down"
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'd' || event.key === 'D') {
        snake.direction = "Right"
    }
});
