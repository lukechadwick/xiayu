import { boss, gameWindow, windowWidth, windowHeight } from '../index';

import { createBullet } from './projectiles';
import { bossHit } from './collision';

export let startGameTime = 0;
export let countDown = 0;

export function setTime(start, countdown) {
  startGameTime = start;
  countDown = countdown;
}

export function bossBehavior() {
  //Set current time and begin countdown
  if (startGameTime == 0) startGameTime = Date.now();
  countDown = 60 - Math.floor((Date.now() - startGameTime) / 1000);

  //countDown text settings
  gameWindow.fillStyle = countDown > 5 ? 'Black' : 'red';
  gameWindow.font = '15px Arial';

  //Draw counter until boss is ready, prevent ammo stocking up before boss spawns
  if (countDown > 0) {
    boss.ammo = 0;
    gameWindow.fillText('Boss Timer:' + countDown, windowWidth / 2 - 40, 15);
  }

  //Remove counter and begin boss routines
  if (countDown <= 0) {
    moveBoss();

    wallCollisionDetection();

    bossAttack();

    drawBoss();

    bossHit();
  }
}

//Control boss movements
function moveBoss() {
  if (boss.health > 0) {
    boss.x += boss.dx;
    boss.y += boss.dy;
  }
}

function bossAttack() {
  //Fire if boss has ammo
  if (boss.ammo > 0) {
    boss.ammo--;
    createBullet('b');
  }

  //Don't go down without a fight, if boss is dying give a million ammo
  if (boss.health <= 0) {
    boss.ammo = 1000000;
  }
}

//Boss will bounce off boundaries to keep inside game world
function wallCollisionDetection() {
  if (boss.x + boss.dx > windowWidth + 10 || boss.x + boss.dx < -130) {
    boss.dx = -boss.dx;
  }
  if (boss.y + boss.dy > windowHeight - 100 || boss.y + boss.dy < -50) {
    boss.dy = -boss.dy;
  }
}

export function drawBoss() {
  let bossImage = new Image();

  //Change color of boss when reloading/vulnerable
  bossImage.src =
    boss.ammo == 0 ? './assets/boss.png' : './assets/bossGreen.png';

  gameWindow.drawImage(bossImage, boss.x, boss.y);
}
