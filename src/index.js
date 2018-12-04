import { drawPlatform, generatePlatform } from './gameJS/platforms';
import { drawPlayer, makePlayer } from './gameJS/players';
import { keyHandler } from './gameJS/controls';
import { drawBullet, ballSpeed, resetBounceState } from './gameJS/projectiles';
import { physics, boundaries } from './gameJS/physics';
import {
	hitDetection,
	bulletCollision,
	isOnPlatform,
	bossHit,
	bulletCollisionPlat
} from './gameJS/collision';
import { drawHealthBar } from './gameJS/healthbars';
import { drawBoss, bossBehavior } from './gameJS/boss';
import { AI } from './gameJS/AI';

//Setup hotkey listener
document.addEventListener('keydown', keyHandler);
document.addEventListener('keyup', keyHandler);

//Setup game window
export let gameWindow = document.querySelector('canvas').getContext('2d');

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

function worldSize(arg) {
	windowHeight = arg == 1 ? 300 : arg == 2 ? 450 : arg == 3 ? 600 : 750;
	windowWidth = arg == 1 ? 700 : arg == 2 ? 1050 : arg == 3 ? 1400 : 1750;

	gameWindow.canvas.height = windowHeight;
	gameWindow.canvas.width = windowWidth;
	generatePlatform();
}

export let controlState = {
	left: false,
	right: false,
	up: false,
	down: false,
	shoot: false
};

//Player
export let playerSize = 40,
	duckHeight = playerSize / 2,
	playerNumber = 4;

//World
export let windowHeight = 300,
	windowWidth = 700,
	groundHeight = 25;

//Ball
export let bulletRadius = 5,
	bulletVelocity = 5;

let bosstime = 0;

//Window Size
gameWindow.canvas.height = windowHeight;
gameWindow.canvas.width = windowWidth;

//Arrays
export let bulletArray = {
	bullets: []
};

export let playerArray = {
	players: []
};

export let platformArray = {
	plat: []
};

export let boss = {
	x: Math.random() * (windowWidth - 0) + 0,
	y: 0,
	dx: Math.random() * (3 - 1) + 1,
	dy: Math.random() * (3 - 1) + 1,
	health: 200,
	state: 'left',
	ammo: 100
};

//Build World Items
drawSetupWindow();
generatePlatform();
makePlayer();

setInterval(function restoreBossAmmo() {
	boss.ammo = 100;
}, 8000);

setInterval(function updateAI() {
	AI();
	resetBounceState();

	drawSetupWindow();
}, 200);

//Start boss spawn timer
setTimeout(function() {
	bosstime = 1;
}, 60000);

export function setupGame() {
	//Hide box after starting
	document.getElementById('gameSetup').style.display = 'none';

	//Set Players to input value
	playerNumber = Number(document.getElementById('botPlayerAmount').value);

	generatePlatform();
	makePlayer();
}

function checkWin() {
	//Winner
	if (playerArray.players.length == 1 && boss.health <= 0)
		document.getElementById('winner').style.display = 'block';

	//Game Over
	if (playerArray.players.length == 0)
		document.getElementById('gameOver').style.display = 'block';
}

function drawFrame() {
	gameWindow.clearRect(0, 0, windowWidth, windowHeight);

	//If one minute has passed in game, begin boss behavior
	if (bosstime == 1) {
		if (boss.y < windowHeight + 100) {
			drawBoss();
			bossBehavior();
		}
	}

	checkWin();

	drawHealthBar();

	physics();

	boundaries();

	bossHit();

	bulletCollisionPlat();

	drawPlatform();

	bulletCollision();

	drawPlayer();

	hitDetection();

	isOnPlatform();

	drawBullet();

	ballSpeed();

	// call update when the browser is ready to draw again
	window.requestAnimationFrame(drawFrame);
}
drawFrame();

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

function drawBackDrop() {}

function dropRocket() {}
