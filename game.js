var gameWindow, controlState, playerSprite, loop;

document.addEventListener("keydown", keyHandler);
document.addEventListener("keyup", keyHandler);

gameWindow = document.querySelector("canvas").getContext("2d");

//Player
let boxSize = 40;
let duckHeight = boxSize / 2;
let playerNumber = 2;

//World
let windowHeight = 200;
let windowWidth = 640;
let groundHeight = 24;

//Gun State
let gunReloading = false;

//Ball
var ballRadius = 10;
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


//Draw a square
playerSprite = {
	height: boxSize,
	width: boxSize / 2,

	jumpState: false,

	x: windowWidth / 2,
	y: 0,
	x_velocity: 0,
	y_velocity: 0
};


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
	for (let i = ballnumber - 1; i < ballnumber; i++) {
		ballArray.balls[i] = {
			"dx": ballspeed + Math.random(),
			"dy": -(ballspeed + Math.random()),
			'x': (playerSprite.x + 20),
			'y': (playerSprite.y + 15)
		}
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
	if (controlState.down) {
		boxSize = duckHeight;
		playerSprite.height = boxSize;
	} else {
		boxSize = duckHeight * 2;
		playerSprite.height = boxSize
	}
}

function boundaries() {
	// if player is going off the left of the screen
	if (playerSprite.x < -boxSize)
		playerSprite.x = windowWidth;
	// if player goes past right boundary
	else if (playerSprite.x > windowWidth)
		playerSprite.x = -boxSize;
}

function physics() {
	if (controlState.up && playerSprite.jumping == false) {
		playerSprite.y_velocity -= 25;
		playerSprite.jumping = true;
	}

	if (controlState.left)
		playerSprite.x_velocity -= 0.5;

	if (controlState.right)
		playerSprite.x_velocity += 0.5;

	// gravity
	playerSprite.y_velocity += 1.2;
	playerSprite.x += playerSprite.x_velocity;
	playerSprite.y += playerSprite.y_velocity;

	// friction
	playerSprite.x_velocity *= 0.9;
	playerSprite.y_velocity *= 0.9;

	// if rectangle is falling below floor line
	if (playerSprite.y > windowHeight - groundHeight - boxSize) {
		playerSprite.jumping = false;
		playerSprite.y = windowHeight - groundHeight - boxSize;
		playerSprite.y_velocity = 0;
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
	for (let i = 0; i < ballnumber; i++) {
		gameWindow.beginPath();
		gameWindow.arc(ballArray.balls[i].x, ballArray.balls[i].y, ballRadius, 0, Math.PI * 2);
		gameWindow.fillStyle = "#0095DD";
		gameWindow.fill();
		gameWindow.stroke();
		gameWindow.closePath();
	}
}

function drawBox() {
  for (let i = 0; i < 1; i++) {
    gameWindow.beginPath();
    gameWindow.fillStyle = "#ff0000"; // hex for red
    gameWindow.rect(playerSprite.x, playerSprite.y, playerSprite.width, playerSprite.height); 
    gameWindow.fill();
    gameWindow.closePath();

  }
}

function drawLine() {
	gameWindow.strokeStyle = "#202830";
	gameWindow.lineWidth = 4;
	gameWindow.beginPath();
	gameWindow.moveTo(0, windowHeight - groundHeight);
	gameWindow.lineTo(windowWidth, windowHeight - groundHeight);
	gameWindow.stroke();
}