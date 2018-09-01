import { drawPlatform, generatePlatform } from "./gameJS/platforms";

import { drawPlayer, makePlayer } from "./gameJS/players";

import { keyHandler} from "./gameJS/controls";

import { drawBullet, ballSpeed } from "./gameJS/projectiles";

import { physics, boundaries } from "./gameJS/physics";

import { hitDetection, bulletCollision, isOnPlatform } from "./gameJS/collision";

import { drawHealthBar } from "./gameJS/healthbars";

import { drawBoss, bossBehavior } from "./gameJS/boss";

document.addEventListener("keydown", keyHandler);
document.addEventListener("keyup", keyHandler);

export let 
    gameWindow = document.querySelector("canvas").getContext("2d");

export let 
    controlState = {
        left: false,
        right: false,
        up: false,
        down: false,
        shoot: false
    };

//Player
export let 
    playerSize = 40,
    duckHeight = playerSize / 2,
    playerNumber = 4;

//World
export let 
    windowHeight = 300,
    windowWidth = 700,
    groundHeight = 25;

//Ball
export let 
    bulletRadius = 5,
    bulletVelocity = 5;

//Window Size
gameWindow.canvas.height = windowHeight;
gameWindow.canvas.width = windowWidth;

//Arrays
export let bulletArray = {
    "bullets": []
}

export let playerArray = {
    "players": []
}

export let platformArray = { 
    "plat": []
}

export let boss = {
    bossX: (windowWidth /2),
    bossY: (windowHeight - 200),
    health: 200,
    state: 'left'
}

//Build World Items
generatePlatform();
makePlayer();

function drawFrame() {
    gameWindow.clearRect(0, 0, windowWidth, windowHeight);

    physics();

    boundaries();

    //drawBackDrop();

    drawPlatform();

    bulletCollision();

    drawHealthBar();

    drawPlayer();

    drawBullet();

    hitDetection();

    isOnPlatform();

    ballSpeed();

    drawBoss();

    bossBehavior();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(drawFrame);
};
drawFrame();

function drawBackDrop() {

}

function dropRocket (){
    
}