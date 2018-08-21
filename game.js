var gameWindow, controlState;

document.addEventListener("keydown", keyHandler);
document.addEventListener("keyup", keyHandler);

gameWindow = document.querySelector("canvas").getContext("2d");

//Player
let boxSize = 40;
let duckHeight = boxSize / 2;
let playerNumber = 2;
let boxSize2 = 40;

let bulletOrigin = 0;

//World
let windowHeight = 300;
let windowWidth = 700;
let groundHeight = 25;

//Ball
var ballRadius = 5;
let ballnumber = 1;
let ballspeed = 5;

//Window Size
gameWindow.canvas.height = windowHeight;
gameWindow.canvas.width = windowWidth;

let bulletArray = {
    "bullets": []
}

let playerArray = {
    "players": []
}

function makePlayer() {
    for (let i = 0; i < playerNumber; i++) {
        playerArray.players[i] = {
            height: boxSize,
            width: boxSize / 2,

            jumpState: false,

            x: windowWidth / 2,
            y: 0,
            x_velocity: 0,
            y_velocity: 0,
            reloading: false
        }
        console.log(playerArray)
    }
}

makePlayer();

controlState = {
    left: false,
    right: false,
    up: false,
    down: false,
    shoot: false
};

control2State = {
    aKey: false,
    dKey: false,
    wKey: false,
    sKey: false,
    shoot: false
};

function drawBullet(num) {
    for (let i = ballnumber - 1; i < ballnumber; i++) {
        let dxMod, bulletOffset;
        if (num === 0) {
            dxMod = ballspeed + Math.random(),
                bulletOffset = 40;
        }
        if (num === 1) {
            dxMod = -ballspeed + Math.random(),
                bulletOffset = -20;
        }
        bulletArray.bullets[i] = {
            "dx": dxMod,
            "dy": -ballspeed + Math.random(),
            'x': (playerArray.players[num].x + bulletOffset),
            'y': (playerArray.players[num].y + 15)
        }
        console.log(bulletArray)
    }
}
drawBullet(0);

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

function drawFrame() {
    gameWindow.clearRect(0, 0, windowWidth, windowHeight);

    physics();

    boundaries();

    duck();

    //drawBackDrop();

    drawBox();

    drawLine();

    drawBall();

    ballCollision()

    ballSpeed();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(drawFrame);
};
drawFrame();



function shoot(num) {
    if (!playerArray.players[num].reloading) {
        ballnumber++
        drawBullet(num);
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
        if (playerArray.players[i].x < -boxSize) {
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

        // if rectangle is falling below floor line
        if (playerArray.players[i].y > windowHeight - groundHeight - playerArray.players[i].height) {
            playerArray.players[i].jumping = false;
            playerArray.players[i].y = windowHeight - groundHeight - playerArray.players[i].height;
            playerArray.players[i].y_velocity = 0;
        }
    }
}

function ballSpeed() {
    for (let i = 0; i < ballnumber; i++) {
        bulletArray.bullets[i].x += bulletArray.bullets[i].dx;
        //  bulletArray.bullets[i].y += bulletArray.bullets[i].dy;  //move ball up and down / Y-axis
    }
}

function drawBackDrop() {

}

function drawBall() {
    for (let i = 0; i < playerNumber; i++) {
        for (let i = 0; i < ballnumber; i++) {
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

function drawLine() {
    //   gameWindow.strokeStyle = "#202830";
    //   gameWindow.lineWidth = 4;
    gameWindow.beginPath();
    gameWindow.moveTo(0, windowHeight - groundHeight);
    gameWindow.lineTo(windowWidth, windowHeight - groundHeight);
    //   gameWindow.stroke();
}

function ballCollision() {
    for (let i = 0; i < ballnumber; i++) {
        for (let j = 0; j < playerNumber; j++) {
            if (bulletArray.bullets[i].x - playerArray.players[j].x < 5 && bulletArray.bullets[i].x - playerArray.players[j].x > 0 &&
                bulletArray.bullets[i].y - playerArray.players[j].y < 40 && bulletArray.bullets[i].y - playerArray.players[j].y > 0) {
                console.log('bang')
                bulletArray.bullets[i].y = bulletArray.bullets[i].y + 200;
            }
        }
    }
}