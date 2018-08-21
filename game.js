var gameWindow, controlState;

document.addEventListener("keydown", keyHandler);
document.addEventListener("keyup", keyHandler);

gameWindow = document.querySelector("canvas").getContext("2d");

//Player
let playerSize = 40;
let duckHeight = playerSize / 2;
let playerNumber = 2;

let object1 = {}
let object2 = {}

//World
let windowHeight = 300;
let windowWidth = 700;
let groundHeight = 25;

//Ball
var ballRadius = 5;
let ballsInWorld = 1;
let ballVelocity = 5;

//Window Size
gameWindow.canvas.height = windowHeight;
gameWindow.canvas.width = windowWidth;

//Arrays
let bulletArray = {
    "bullets": []
}

let playerArray = {
    "players": []
}

let playformArray = { 
    "plat": [{startX:30, endX: 110, startY: 100, endY: 100}]
}

controlState = {
    left: false,
    right: false,
    up: false,
    down: false,
    shoot: false
};

makePlayer();
createBullet(0);

function drawFrame() {
    gameWindow.clearRect(0, 0, windowWidth, windowHeight);

    physics();

    boundaries();

    duck();

    //drawBackDrop();

    drawPlatform();

    bulletCollision();

    drawHealthBar();

    drawBox();

    drawFloor();

    drawBullet();

    ballCollision()

    ballSpeed();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(drawFrame);
};
drawFrame();

function makePlayer() {
    for (let i = 0; i < playerNumber; i++) {
        playerArray.players[i] = {
            height: playerSize,
            width: playerSize / 2,

            jumpState: false,

            x: windowWidth / 2,
            y: 0,
            x_velocity: 0,
            y_velocity: 0,
            reloading: false,
            health: 100
        }
        console.log(playerArray)
    }
}

function keyHandler(e) {
    var key_state = (event.type == "keydown") ? true : false;

    //Player One
    if (e.keyCode == 65)
        controlState.aKey = key_state;
    else if (e.keyCode == 87)
        controlState.wKey = key_state
    else if (e.keyCode == 68)
        controlState.dKey = key_state;
    else if (e.keyCode == 83)
        controlState.sKey = key_state;
    else if (e.keyCode == 16) {
        controlState.shiftKey = key_state;

    if (!playerArray.players[0].reloading && (controlState.shiftKey))
        shoot(0);
    }

    //Player Two
    if (e.keyCode == 37)
        controlState.left = key_state;
    else if (e.keyCode == 38)
        controlState.up = key_state
    else if (e.keyCode == 39)
        controlState.right = key_state;
    else if (e.keyCode == 40)
        controlState.down = key_state;
    else if (e.keyCode == 32) {
        controlState.spaceKey = key_state;

    if (!playerArray.players[1].reloading && (controlState.spaceKey))
        shoot(1);
    }
}

function shoot(num) {
    if (!playerArray.players[num].reloading) {
        ballsInWorld++
        createBullet(num);
        playerArray.players[num].reloading = true;
    }
    if (playerArray.players[num].reloading) {
        setTimeout(function() {
            playerArray.players[num].reloading = false;
        }, 500);
    }
}

function duck() {
    for (let i = 0; i < playerNumber; i++) {
        if (controlState.down) {
            playerArray.players[0].height = duckHeight;
        } else {
            playerArray.players[0].height = duckHeight * 2;
        }
        if (controlState.sKey) {
            playerArray.players[1].height = duckHeight;
        } else {
            playerArray.players[1].height = duckHeight * 2;
        }
    }
}

function boundaries() {
    for (let i = 0; i < playerNumber; i++) {
        // if player is going off the left of the screen
        if (playerArray.players[i].x < -playerSize) {
            playerArray.players[i].x = -10;
            playerArray.players[i].x_velocity = 0;
        }
        // if player goes past right boundary
        else if (playerArray.players[i].x > windowWidth)
            playerArray.players[i].x = windowWidth;
    }
}

function physics() {
    for (let i = 0; i < playerNumber; i++) {
        //Player one controls
        if (controlState.up && playerArray.players[0].jumping == false) {
            playerArray.players[0].y_velocity -= 20;
            playerArray.players[0].jumping = true;
        }
        if (controlState.left)
            playerArray.players[0].x_velocity -= 0.2;

        if (controlState.right)
            playerArray.players[0].x_velocity += 0.2;

        //Player 2 Controls
        if (controlState.wKey && playerArray.players[1].jumping == false) {
            playerArray.players[1].y_velocity -= 20;
            playerArray.players[1].jumping = true;
        }
        if (controlState.aKey)
            playerArray.players[1].x_velocity -= 0.2;

        if (controlState.dKey)
            playerArray.players[1].x_velocity += 0.2;
 
        // gravity
        playerArray.players[i].y_velocity += 1.2;
        playerArray.players[i].x += playerArray.players[i].x_velocity;
        playerArray.players[i].y += playerArray.players[i].y_velocity;

        // friction
        playerArray.players[i].x_velocity *= 0.9;
        playerArray.players[i].y_velocity *= 0.9;

        //If player is dead take away collision with floor
        if (playerArray.players[i].health > 1){
        // if rectangle is falling below floor line
            if (playerArray.players[i].y > windowHeight - groundHeight - playerArray.players[i].height) {
                playerArray.players[i].jumping = false;
                playerArray.players[i].y = windowHeight - groundHeight - playerArray.players[i].height;
                    
                playerArray.players[i].y_velocity = 0;
            }
        }
    }
}

function ballCollision() {
    for (let i = 0; i < ballsInWorld; i++) {
        for (let j = 0; j < playerNumber; j++) {
            if (bulletArray.bullets[i].x - playerArray.players[j].x < 5 && bulletArray.bullets[i].x - playerArray.players[j].x > 0 &&
                bulletArray.bullets[i].y - playerArray.players[j].y < 40 && bulletArray.bullets[i].y - playerArray.players[j].y > 0) {
                
                
                console.log('Player ' + j + " Hit")
                bulletArray.bullets[i].y = bulletArray.bullets[i].y + 200;
                
                playerArray.players[j].health -= 10;
                console.log(playerArray.players[j].health)
            }
        }
    }
}

function bulletCollision() {
    for (let i = 0; i < ballsInWorld; i++) {
        for (let j = 0; j < ballsInWorld; j++) {
            if (bulletArray.bullets[i].x - bulletArray.bullets[j].x < 5 && bulletArray.bullets[i].x - bulletArray.bullets[j].x > 0 &&
                bulletArray.bullets[i].y - bulletArray.bullets[j].y < 5 && bulletArray.bullets[i].y - bulletArray.bullets[j].y > 0) {
                  //  bulletArray.bullets[i].dx = -bulletArray.bullets[i].dx;
                  //  bulletArray.bullets[j].dy = -bulletArray.bullets[j].dy;
                    console.log('boing!')
            }
        }
    }
}

function ballSpeed() {
    for (let i = 0; i < ballsInWorld; i++) {
        bulletArray.bullets[i].x += bulletArray.bullets[i].dx;
        //  bulletArray.bullets[i].y += bulletArray.bullets[i].dy;  //move ball up and down / Y-axis
    }
}

function drawBackDrop() {

}

function createBullet(num) {
    for (let i = ballsInWorld - 1; i < ballsInWorld; i++) {
        let dxMod, bulletOffset;
        if (num === 0) {
            dxMod = ballVelocity + Math.random(),
                bulletOffset = 40;
        }
        if (num === 1) {
            dxMod = -ballVelocity + Math.random(),
                bulletOffset = -20;
        }
        bulletArray.bullets[i] = {
            "dx": dxMod,
            "dy": -ballVelocity + Math.random(),
            'x': (playerArray.players[num].x + bulletOffset),
            'y': (playerArray.players[num].y + 15)
        }
        console.log(bulletArray)
    }
}

function drawBullet() {
    for (let i = 0; i < playerNumber; i++) {
        for (let i = 0; i < ballsInWorld; i++) {
            gameWindow.beginPath();
            gameWindow.arc(bulletArray.bullets[i].x, bulletArray.bullets[i].y, ballRadius, 0, Math.PI * 2);
            gameWindow.fillStyle = "#0095DD";
            gameWindow.fill();
            gameWindow.stroke();
            gameWindow.closePath();
        }
    }
}

function drawBox() {
    for (let i = 0; i < playerNumber; i++) {
        gameWindow.beginPath();
        gameWindow.fillStyle = "red"; // hex for red

        if (i > 0)
            gameWindow.fillStyle = "yellow";

        gameWindow.rect(playerArray.players[i].x, playerArray.players[i].y, playerArray.players[i].width, playerArray.players[i].height);
        gameWindow.fill();
        gameWindow.strokeStyle = "black";
        gameWindow.stroke();

        gameWindow.closePath();
    }
}

function drawFloor() {
    gameWindow.beginPath();
    gameWindow.moveTo(0, windowHeight - groundHeight);
    gameWindow.lineTo(windowWidth, windowHeight - groundHeight);
}

function drawPlatform() {
    gameWindow.strokeStyle = "black";
    gameWindow.beginPath();
    gameWindow.moveTo(playformArray.plat[0].startX,playformArray.plat[0].startY);
    gameWindow.lineTo(playformArray.plat[0].endX,playformArray.plat[0].endY);
    gameWindow.stroke();

}

function drawHealthBar() {
    for (let j = 0; j < playerNumber; j++) {
        //Health Colors
        if (playerArray.players[j].health < 21)
            gameWindow.fillStyle = "red"
        else if (playerArray.players[j].health < 51)
            gameWindow.fillStyle = "orange"
        else
            gameWindow.fillStyle = "green"
        
        //Draw Health Bar
        gameWindow.beginPath();
        gameWindow.rect(playerArray.players[j].x -5 , playerArray.players[j].y -15 , playerArray.players[j].health / 3.3, 5);
        gameWindow.fill();
        gameWindow.strokeStyle = "black";
        gameWindow.stroke();
        gameWindow.closePath();
    }
}