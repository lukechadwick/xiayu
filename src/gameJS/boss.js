import { 
    boss, 
    gameWindow, 
    windowWidth,
    windowHeight
} from "../index";

import {
    createBullet
} from "./projectiles"

export function bossBehavior () {

    moveBoss();

    wallCollisionDetection();

    bossAttack();

    createBullet('b');
}

function moveBoss() {
        boss.x += boss.dx;
        boss.y += boss.dy;
}

function bossAttack(){
    //bang
}

function wallCollisionDetection() {
    if (boss.x + boss.dx > windowWidth + 50 || boss.x + boss.dx < -100) {
        console.log('Boss: Changing X direction')
        boss.dx = -boss.dx;
    }
    if (boss.y + boss.dy > windowHeight + 50 || boss.y + boss.dy < -100) {
        boss.dy = -boss.dy;
        console.log('Boss: Changing Y direction')
    }
}


export function drawBoss() {
    let drawing = new Image();
    drawing.src = "./assets/boss.png"; // can also be a remote URL e.g. http://
    gameWindow.drawImage(drawing, boss.x +  + Math.random() * 5,  boss.y +  + Math.random() * 5);
}