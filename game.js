var gameWindow, controlState, playerSprite, loop;

document.addEventListener("keydown", keyHandler);
document.addEventListener("keyup", keyHandler);

gameWindow = document.querySelector("canvas").getContext("2d");

let boxSize = 40;
let duckHeight = boxSize / 2;
let windowHeight = 200;
let windowWidth = 640;
let groundHeight = 24;

gameWindow.canvas.height = windowHeight;
gameWindow.canvas.width = windowWidth;

//Draw a square
playerSprite = {
  height: boxSize,
  width: boxSize / 2,

  jumpState: false,

  x: windowWidth / 2, // center of the canvas
  y: 0,
  x_velocity: 0,
  y_velocity: 0
};

controlState = {
  left: false,
  right: false,
  up: false,
  down: false,
};

function keyHandler(e) {
  var key_state = (event.type == "keydown") ? true : false;

  if (e.keyCode == 37)
    controlState.left = key_state;
  else if (e.keyCode == 38)
    controlState.up = key_state
  else if (e.keyCode == 39)
    controlState.right = key_state;
  else if (e.keyCode == 40)
    controlState.down = key_state;
}

function draw() {

  physics();

  boundaries();

  duck();

  drawBox();

  drawLine();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(draw);
};
draw();

function duck() {
  if (controlState.down) {
    boxSize = duckHeight;
    playerSprite.height = boxSize;
    //rectangle.y = boxheight;
  } else {
    boxSize = duckHeight * 2;
    playerSprite.height = boxSize
    //rectangle.height = boxSize;
  }
}

function boundaries() {
  // if rectangle is going off the left of the screen
  if (playerSprite.x < -boxSize)
    playerSprite.x = windowWidth;
  else if (playerSprite.x > windowWidth) // if rectangle goes past right boundary
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

function drawBox() {
  gameWindow.fillStyle = "#202020";
  gameWindow.fillRect(0, 0, windowWidth, windowHeight); // x, y, width, height
  gameWindow.fillStyle = "#ff0000"; // hex for red
  gameWindow.beginPath();
  gameWindow.rect(playerSprite.x, playerSprite.y, playerSprite.width, playerSprite.height);
  gameWindow.fill();
}

function drawLine() {
  gameWindow.strokeStyle = "#202830";
  gameWindow.lineWidth = 4;
  gameWindow.beginPath();
  gameWindow.moveTo(0, windowHeight - groundHeight);
  gameWindow.lineTo(windowWidth, windowHeight - groundHeight);
  gameWindow.stroke();
}