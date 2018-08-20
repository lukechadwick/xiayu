var gameWindow, controlState;

document.addEventListener("keydown", keyHandler);
document.addEventListener("keyup", keyHandler);

gameWindow = document.querySelector("canvas").getContext("2d");

//Player
let boxSize = 40;
let duckHeight = boxSize / 2;
let playerNumber = 2;
let boxSize2 = 40;

//World
let windowHeight = 300;
let windowWidth = 700;
let groundHeight = 25;

//Gun State
let gunReloading = false;

//Ball
var ballRadius = 5;
let ballnumber = 1;
let ballspeed = 5;

//Window Size
gameWindow.canvas.height = windowHeight;
gameWindow.canvas.width = windowWidth;

let ballArray = {
    "balls": []
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
            y_velocity: 0
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

function makeBall() {
	let origin = 0;
    for (let i = ballnumber - 1; i < ballnumber; i++) {
        	for (let i = 0; i < playerNumber; i++) {
				origin = i;
			}
        ballArray.balls[i] = {
            "dx": ballspeed + Math.random(),
            "dy": -(ballspeed + Math.random()),
            'x': (playerArray.players[1].x + 20),
            'y': (playerArray.players[1].y + 15)
        }
        //	}
        console.log(ballArray)
    }
}
makeBall();

function keyHandler(e) {
    var key_state = (event.type == "keydown") ? true : false;

    //Player One
    if (e.keyCode == 37)
        controlState.left = key_state;
    else if (e.keyCode == 38)
        controlState.up = key_state
    else if (e.keyCode == 39)
        controlState.right = key_state;
    else if (e.keyCode == 40)
        controlState.down = key_state;
    else if (e.keyCode == 32)
        controlState.shoot = key_state;

    //Player2
    if (e.keyCode == 65)
        controlState.aKey = key_state;
    else if (e.keyCode == 87)
        controlState.wKey = key_state
    else if (e.keyCode == 68)
        controlState.dKey = key_state;
    else if (e.keyCode == 83)
        controlState.sKey = key_state;
    else if (e.keyCode == 32) {
        controlState.shoot = key_state;
    }
    if (!gunReloading)
        shoot();
}

function drawFrame() {
    gameWindow.clearRect(0, 0, windowWidth, windowHeight);

    physics();

    boundaries();

	duck();
	
	ballCollision()

    //drawBackDrop();

    drawBox();

    drawLine();

    drawBall();

    ballSpeed();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(drawFrame);
};
drawFrame();

function shoot() {
    if (controlState.shoot && !gunReloading) {
        ballnumber++
        makeBall();
        gunReloading = true;
    }
    //  controlState.shoot = false;
    if (gunReloading) {
        setTimeout(function() {
            gunReloading = false;
        }, 500);
    }
}

function duck() {
    for (let i = 0; i < playerNumber; i++) {
        if (controlState.down) {
            playerArray.players[0].height = duckHeight;
		} 
		else {
            playerArray.players[0].height = duckHeight * 2;
		}
		if (controlState.sKey) {
            playerArray.players[1].height = duckHeight;
		} 
		else {
            playerArray.players[1].height = duckHeight * 2;
        }
    }
}

function boundaries() {
    for (let i = 0; i < playerNumber; i++) {
        // if player is going off the left of the screen
        if (playerArray.players[i].x < -boxSize)
            playerArray.players[i].x = windowWidth;
        // if player goes past right boundary
        else if (playerArray.players[i].x > windowWidth)
            playerArray.players[i].x = -boxSize;
    }
}

function physics() {
    for (let i = 0; i < playerNumber; i++) {
        //Player one controls
        if (controlState.up && playerArray.players[0].jumping == false) {
            playerArray.players[0].y_velocity -= 25;
            playerArray.players[0].jumping = true;
        }
        if (controlState.left)
            playerArray.players[0].x_velocity -= 0.5;

        if (controlState.right)
            playerArray.players[0].x_velocity += 0.5;

        //Player 2 Controls
        if (controlState.wKey && playerArray.players[1].jumping == false) {
            playerArray.players[1].y_velocity -= 25;
            playerArray.players[1].jumping = true;
        }
        if (controlState.aKey)
            playerArray.players[1].x_velocity -= 0.5;

        if (controlState.dKey)
            playerArray.players[1].x_velocity += 0.5;

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
        ballArray.balls[i].x += ballArray.balls[i].dx;
        //  ballArray.balls[i].y += ballArray.balls[i].dy;  //move ball up and down / Y-axis
    }
}

function drawBackDrop() {
    gameWindow.beginPath();

    var windowGradient = gameWindow.createLinearGradient(0, 200, 0, 0);
    windowGradient.addColorStop(0, "black");
    windowGradient.addColorStop(1, "gray");

    gameWindow.fillStyle = windowGradient;
    // gameWindow.closePath();
}

function drawBall() {
    for (let i = 0; i < playerNumber; i++) {
        for (let i = 0; i < ballnumber; i++) {
            gameWindow.beginPath();
            gameWindow.arc(ballArray.balls[i].x + 20, ballArray.balls[i].y, ballRadius, 0, Math.PI * 2);
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
			gameWindow.fillStyle = "green";
			
        gameWindow.rect(playerArray.players[i].x, playerArray.players[i].y, playerArray.players[i].width, playerArray.players[i].height);
		gameWindow.fill();
		gameWindow.strokeStyle = "black";
		gameWindow.stroke();

        gameWindow.closePath();
    }
}

function drawLine() {
    gameWindow.strokeStyle = "#202830";
    gameWindow.lineWidth = 4;
    gameWindow.beginPath();
    gameWindow.moveTo(0, windowHeight - groundHeight);
    gameWindow.lineTo(windowWidth, windowHeight - groundHeight);
 //   gameWindow.stroke();
}


function ballCollision() {
    for (let i = 0; i < ballnumber; i++) {
        for (let j = 0; j < playerNumber; j++) {
            if (ballArray.balls[i].x - playerArray.players[j].x < 5 && ballArray.balls[i].x - playerArray.players[j].x > 0 &&
                ballArray.balls[i].y - playerArray.players[j].y < 40 && ballArray.balls[i].y - playerArray.players[j].y > 0) {
					console.log('bang')
            }
        }  
    }
}