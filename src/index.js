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

let bosstime = 0;

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
    x: Math.random() * (windowWidth - 0) + 0,
    y: 0,
    dx: Math.random() * (3 - 1) + 1,
    dy: Math.random() * (3 - 1) + 1,
    health: 200,
    state: 'left',
    ammo: 100
}

//Build World Items
generatePlatform();
makePlayer();

setInterval(
    function restoreBossAmmo(){ 
        boss.ammo = 100;
    }, 8000);

//Start boss spawn timer
setTimeout(
    function(){ 
        bosstime = 1; 
    }, 3000);

function drawFrame() {
    gameWindow.clearRect(0, 0, windowWidth, windowHeight);
    
    if (bosstime == 2) {
        drawBoss();
        bossBehavior();
    }

    drawBullet();

    drawHealthBar();
    
    physics();

    boundaries();

    //drawBackDrop();

    drawPlatform();

    bulletCollision();

    drawPlayer();

    hitDetection();

    isOnPlatform();

    ballSpeed();

    // call update when the browser is ready to draw again
    window.requestAnimationFrame(drawFrame);
};
drawFrame();

function drawBackDrop() {

}

function dropRocket (){
    
}