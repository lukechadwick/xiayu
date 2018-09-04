import {
	playerArray,
	bulletArray,
	platformArray,
	playerNumber,
	boss
} from "../index";

export function hitDetection() {
	for (let i = 0; i < bulletArray.bullets.length; i++) {
		for (let j = 0; j < playerArray.players.length; j++) {
			if (bulletArray.bullets[i].x - playerArray.players[j].x < 20 && bulletArray.bullets[i].x - playerArray.players[j].x > 0 &&
				bulletArray.bullets[i].y - playerArray.players[j].y < 40 && bulletArray.bullets[i].y - playerArray.players[j].y > 0) {
				playerArray.players[[j]].health -= 10;
				bulletArray.bullets[[i]].y = bulletArray.bullets[[i]].y + 1000;
				console.log('Player ' + [j] + " Hit, Current Health: " + playerArray.players[[j]].health)
			}
		}
	}
}

export function isOnPlatform() {
	for (let i = 0; i < playerNumber; i++) {
		for (let j = 0; j < platformArray.plat.length; j++) {
			if (playerArray.players[i].y > platformArray.plat[j].y - playerArray.players[i].height &&
				playerArray.players[i].y < platformArray.plat[j].y &&
				playerArray.players[i].x > platformArray.plat[j].x - 20 &&
				playerArray.players[i].x < platformArray.plat[j].endX) {
				playerArray.players[i].jumping = false;

				if (playerArray.players[i].health > 1) {
					playerArray.players[i].yVelocity = 0;
					playerArray.players[i].y = platformArray.plat[j].y - playerArray.players[i].height + 4;
				}
			}
		}
	}
}

export function bulletCollisionPlat() {
	for (let i = 0; i < bulletArray.bullets.length; i++) {
		for (let j = 0; j < platformArray.plat.length; j++) {
			if (bulletArray.bullets[i].x - platformArray.plat[j].x < 50 && bulletArray.bullets[i].x - platformArray.plat[j].x > 0 &&
				bulletArray.bullets[i].y - platformArray.plat[j].y < 10 && bulletArray.bullets[i].y - platformArray.plat[j].y > 0) {
				if (bulletArray.bullets[i].hasBounced != 1) {
					bulletArray.bullets[[i]].dy = -bulletArray.bullets[[i]].dy
                    bulletArray.bullets[i].hasBounced = 1

				}
			}
		}
	}
}

export function bulletCollision() {
	for (let i = 0; i < bulletArray.bullets.length; i++) {
		for (let j = 0; j < bulletArray.bullets.length; j++) {
			if (bulletArray.bullets[i].x - bulletArray.bullets[j].x < 5 && bulletArray.bullets[i].x - bulletArray.bullets[j].x > -5 &&
				bulletArray.bullets[i].y - bulletArray.bullets[j].y < 5 && bulletArray.bullets[i].y - bulletArray.bullets[j].y > -5) {
				if (i != j) {
					bulletArray.bullets[[i]].dy = -5 * Math.random()
					bulletArray.bullets[[j]].dy = 5 * Math.random()

				}
			}
		}
	}
}

export function bossHit() {
	for (let i = 0; i < bulletArray.bullets.length; i++) {
		for (let j = 0; j < 1; j++) {
			if (bulletArray.bullets[i].x - boss.x < 80 && bulletArray.bullets[i].x - boss.x > 50 &&
				bulletArray.bullets[i].y - boss.y < 120 && bulletArray.bullets[i].y - boss.y > 0) {
				if (boss.ammo == 0 && bulletArray.bullets[i].origin != 1) {
					boss.health -= 10;
					bulletArray.bullets[i].y = bulletArray.bullets[i].y + 1000;
					console.log('Boss ' + ' Hit, Current Health: ' + boss.health)
				}

			}
		}
	}
}