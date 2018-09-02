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
}

function moveBoss() {
    boss.x += boss.dx;
    boss.y += boss.dy;
}

function bossAttack(){
    if (boss.ammo > 0) {
        boss.ammo--
        createBullet('b');
    }
}

function wallCollisionDetection() {
    if (boss.x + boss.dx > windowWidth + 10 || boss.x + boss.dx < -130) {
        console.log('Boss: Changing X direction')
        boss.dx = -boss.dx;
    }
    if (boss.y + boss.dy > windowHeight + 10 || boss.y + boss.dy < -130) {
        boss.dy = -boss.dy;
        console.log('Boss: Changing Y direction')
    }
}

export function drawBoss() {
    let drawing = new Image();
    drawing.src = "./assets/boss.png";
    gameWindow.drawImage(drawing, boss.x,  boss.y);
}