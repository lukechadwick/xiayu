import { boss, gameWindow, windowWidth, windowHeight } from '../index';

import { createBullet } from './projectiles';

export function bossBehavior() {
	moveBoss();

	wallCollisionDetection();

	bossAttack();
}

function moveBoss() {
	boss.x += boss.dx;
	boss.y += boss.dy;
}

function bossAttack() {
	if (boss.ammo > 0) {
		boss.ammo--;
		createBullet('b');
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

export function drawBoss() {
	let drawing = new Image();

	if (boss.ammo == 0) drawing.src = './assets/boss.png';
	else drawing.src = './assets/bossGreen.png';

	gameWindow.drawImage(drawing, boss.x, boss.y);
}
