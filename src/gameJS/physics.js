import {
  playerArray,
  windowHeight,
  windowWidth,
  groundHeight,
  playerSize,
  boss
} from '../index';

export function physics() {
  for (let i = 0; i < playerArray.players.length; i++) {
    //Player Movement
    if (
      playerArray.players[i].upState == true &&
      playerArray.players[i].jumping == false
    ) {
      playerArray.players[i].yVelocity -= 20;
      playerArray.players[i].jumping = true;
    }
    if (playerArray.players[i].leftState) {
      playerArray.players[i].facingLeft = true;
      playerArray.players[i].xVelocity -= 0.4;
    }
    if (playerArray.players[i].rightState) {
      playerArray.players[i].facingLeft = false;
      playerArray.players[i].xVelocity += 0.4;
    }

    // gravity
    playerArray.players[i].yVelocity += 1.2;

    playerArray.players[i].x += playerArray.players[i].xVelocity;
    playerArray.players[i].y += playerArray.players[i].yVelocity;

    if (boss.health < 1) boss.y += 0.5;

    // friction/drag effect
    playerArray.players[i].xVelocity *= 0.9;
    playerArray.players[i].yVelocity *= 0.9;

    //If player is dead take away collision with floor, this taking them out of the game, which will remove them from the player array and free up resources
    if (playerArray.players[i].health > 1) {
      // if rectangle is falling below floor line
      if (
        playerArray.players[i].y >
        windowHeight - groundHeight - playerArray.players[i].height
      ) {
        playerArray.players[i].y =
          windowHeight - groundHeight - playerArray.players[i].height;
        playerArray.players[i].jumping = false;
        playerArray.players[i].yVelocity = 0;
      }
    }
  }
}

export function boundaries() {
  for (let i = 0; i < playerArray.players.length; i++) {
    // Prevent player leaving the left side of the screen
    if (playerArray.players[i].x < -playerSize) {
      playerArray.players[i].x = -10;
      playerArray.players[i].xVelocity = 0;
    }
    // Prevent player leaving the right side of the screen
    if (playerArray.players[i].x > windowWidth)
      playerArray.players[i].x = windowWidth;
  }
}
