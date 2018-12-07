import { drawPlatform, generatePlatform } from './gameJS/platforms';
import { drawPlayer, makePlayer } from './gameJS/players';
import { keyHandler } from './gameJS/controls';
import { drawBullet, ballSpeed, resetBounceState } from './gameJS/projectiles';
import { physics, boundaries } from './gameJS/physics';
import {
  hitDetection,
  bulletCollision,
  isOnPlatform,
  bulletCollisionPlat
} from './gameJS/collision';
import { drawHealthBar } from './gameJS/healthbars';
import { bossBehavior } from './gameJS/boss';
import { AI } from './gameJS/AI';
import { send } from './gameJS/network';

//Setup hotkey listener
document.addEventListener('keydown', keyHandler);
document.addEventListener('keyup', keyHandler);

//Setup game window
export let gameWindow = document.querySelector('canvas').getContext('2d');

//Event listener to caputre input from the gamesetup window, and set game size appropriately
document.addEventListener('DOMContentLoaded', createEventListeners);
function createEventListeners() {
  document.getElementById('ws0').onclick = function() {
    worldSize(1);
  };
  document.getElementById('ws1').onclick = function() {
    worldSize(2);
  };
  document.getElementById('ws2').onclick = function() {
    worldSize(3);
  };
  document.getElementById('ws3').onclick = function() {
    worldSize(4);
  };
}

//When world size is changed, resize window and regenerate platforms appropriate to the window size
function worldSize(arg) {
  windowHeight = arg == 1 ? 300 : arg == 2 ? 450 : arg == 3 ? 600 : 750;
  windowWidth = arg == 1 ? 700 : arg == 2 ? 1050 : arg == 3 ? 1400 : 1750;

  gameWindow.canvas.height = windowHeight;
  gameWindow.canvas.width = windowWidth;
  generatePlatform();
}

//Player default values
export let playerSize = 40,
  duckHeight = playerSize / 2,
  playerNumber = 4;

//World default values
export let windowHeight = 300,
  windowWidth = 700,
  groundHeight = 25;

//Bullet default values
export let bulletRadius = 5,
  bulletVelocity = 5;

let bossTime = 0;

//Window Size
gameWindow.canvas.height = windowHeight;
gameWindow.canvas.width = windowWidth;

//Arrays
// ----------------------------------------------------
//These things should be synced over the network

export let bulletArray = {
  bullets: []
};

export let playerArray = {
  players: []
};

export let platformArray = {
  plat: []
};

//Boss object
export let boss = {
  x: Math.random() * (windowWidth - 0) + 0,
  y: 0,
  dx: Math.random() * (3 - 1) + 1,
  dy: Math.random() * (3 - 1) + 1,
  health: 200,
  state: 'left',
  ammo: 100
};

//------------------------------------------------------------
//Build World on load
drawSetupWindow();
generatePlatform();
makePlayer();

//Give boss 100 ammo every eight seconds
setInterval(function restoreBossAmmo() {
  boss.ammo += 100;
}, 8000);

//Interval for how often AI will make decisions
setInterval(function updateAI() {
  AI();
  resetBounceState();

  drawSetupWindow();
}, 200);

//Will execute after click begin in the game setup window
export function setupGame() {
  //Hide box after starting
  document.getElementById('gameSetup').style.display = 'none';

  //Set Players to input value
  playerNumber = Number(document.getElementById('botPlayerAmount').value);

  generatePlatform();
  makePlayer();

  bossTime = 1;
}

function checkWin() {
  //Winning conditions
  if (
    playerArray.players.length == 1 &&
    boss.health <= 0 &&
    boss.y > windowHeight
  )
    document.getElementById('winner').style.display = 'block';
  else document.getElementById('winner').style.display = 'hidden';

  //Losing conditions / Game Over
  if (playerArray.players.length == 0) {
    document.getElementById('gameOver').style.display = 'block';
  } else {
    document.getElementById('gameOver').style.display = 'hidden';
  }
}

//This will execute every frame
function drawFrame() {
  gameWindow.clearRect(0, 0, windowWidth, windowHeight);

  //If one minute has passed in game, begin boss behavior
  if (bossTime == 1) {
    if (boss.y < windowHeight + 100) {
      bossBehavior();
    }
  }

  checkWin();

  drawHealthBar();

  physics();

  boundaries();

  bulletCollisionPlat();

  drawPlatform();

  bulletCollision();

  drawPlayer();

  hitDetection();

  isOnPlatform();

  drawBullet();

  ballSpeed();

  //send data over network
  send();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(drawFrame);
}
drawFrame();

//Function to center game setup and win/loss screens in the center of the canvas
function drawSetupWindow() {
  let myCanvas = document.getElementById('myCanvas');
  var rect = myCanvas.getBoundingClientRect();

  let setupWindow = document.getElementsByClassName('gameSetup');

  for (let i = 0; i < setupWindow.length; i++) {
    setupWindow[i].style.top =
      rect.top +
      myCanvas.offsetHeight / 2 -
      setupWindow[i].offsetHeight / 2 +
      'px';
    setupWindow[i].style.left =
      rect.left +
      myCanvas.offsetWidth / 2 -
      setupWindow[i].offsetWidth / 2 +
      'px';
  }
}

//Unimplemented functions
function drawBackDrop() {}

function dropRocket() {}
