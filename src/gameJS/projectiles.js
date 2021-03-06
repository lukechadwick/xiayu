import {
  playerArray,
  gameWindow,
  bulletArray,
  bulletRadius,
  bulletVelocity,
  windowHeight,
  windowWidth,
  boss
} from '../index';

export function createBullet(num) {
  let bulletsInWorld = bulletArray.bullets.length;

  for (let i = bulletArray.bullets.length; i < bulletsInWorld + 1; i++) {
    let dxMod, bulletOffset;

    //Spawn bullet to right of player
    if (num !== 'b') {
      if (!playerArray.players[num].facingLeft) {
        dxMod = bulletVelocity + Math.random();
        bulletOffset = 40;
      }
      //Spawn bullet to left of player
      if (playerArray.players[num].facingLeft) {
        dxMod = -bulletVelocity + Math.random();
        bulletOffset = -20;
      }
      bulletArray.bullets[i] = {
        dx: dxMod,
        dy: 0,
        x: playerArray.players[num].x + bulletOffset,
        y: playerArray.players[num].y + 15,
        origin: 0
      };
    } else {
      bulletArray.bullets[i] = {
        dx: Math.random() * (3 - -3) + -3,
        dy: Math.random() * (3 - -3) + -3,
        x: boss.x + 63,
        y: boss.y + 63,
        origin: 1,
        hasBounced: 0
      };
    }
  }
}

//This will reset the bounce state, to prevent the balls constantly bouncing off each other
export function resetBounceState() {
  bulletArray.bullets.forEach(element => {
    element.hasBounced = 0;
  });
}

export function drawBullet() {
  for (let i = 0; i < bulletArray.bullets.length; i++) {
    //Only draw bullets on screen
    if (
      bulletArray.bullets[i].y < windowHeight &&
      bulletArray.bullets[i].x < windowWidth &&
      bulletArray.bullets[i].x > 0
    ) {
      gameWindow.beginPath();
      gameWindow.arc(
        bulletArray.bullets[i].x,
        bulletArray.bullets[i].y,
        bulletRadius,
        0,
        Math.PI * 2
      );
      gameWindow.fillStyle =
        '#' + ((Math.random() * 0xffffff) << 0).toString(16);
      gameWindow.fill();
      gameWindow.strokeStyle = 'black';
      gameWindow.stroke();
      gameWindow.closePath();
    }
    //Cull offscreen bullets from array
    else {
      let deadBullets = bulletArray.bullets.splice(i, 1);
    }
  }
}

//Bullet velocity
export function ballSpeed() {
  for (let i = 0; i < bulletArray.bullets.length; i++) {
    bulletArray.bullets[i].x += bulletArray.bullets[i].dx;
    bulletArray.bullets[i].y += bulletArray.bullets[i].dy;
  }
}
