import { boss, gameWindow, windowWidth, windowHeight } from '../index';

import { createBullet } from './projectiles';
let startGameTime = 0;
let countDown = 0;

export function bossBehavior() {
  if (startGameTime == 0) startGameTime = Date.now();
  countDown = 10 - Math.floor((Date.now() - startGameTime) / 1000);

  gameWindow.fillStyle = countDown > 5 ? 'Black' : 'red';
  gameWindow.font = '15px Arial';

  if (countDown > 0) {
    gameWindow.fillText('Boss Timer:' + countDown, windowWidth / 2 - 40, 15);
  }

  if (countDown <= 0) {
    moveBoss();

    wallCollisionDetection();

    bossAttack();

    drawBoss();
  }
}

function moveBoss() {
  if (boss.health > 0) {
    boss.x += boss.dx;
    boss.y += boss.dy;
  }
}

function bossAttack() {
  if (boss.ammo > 0) {
    boss.ammo--;
    createBullet('b');
  }

  //Don't go down without a fight
  if (boss.health <= 0) {
    boss.ammo = 1000000;
  }
}

function wallCollisionDetection() {
  if (boss.x + boss.dx > windowWidth + 10 || boss.x + boss.dx < -130) {
    boss.dx = -boss.dx;
  }
  if (boss.y + boss.dy > windowHeight - 100 || boss.y + boss.dy < -50) {
    boss.dy = -boss.dy;
  }
}

export function bossCountdown(count) {}

export function drawBoss() {
  let bossImage = new Image();

  //Change color of boss when reloading/vulnerable
  bossImage.src =
    boss.ammo == 0 ? './assets/boss.png' : './assets/bossGreen.png';

  gameWindow.drawImage(bossImage, boss.x, boss.y);
}
