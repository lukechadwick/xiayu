import {
    playerArray,
    playerNumber,
    windowHeight,
    windowWidth,
    groundHeight,
    playerSize,
} from "../index";

export function physics() {
    for (let i = 0; i < playerNumber; i++) {

        //Player Movement
        if (playerArray.players[i].upState == true && playerArray.players[i].jumping == false) {
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

        // friction
        playerArray.players[i].xVelocity *= 0.9;
        playerArray.players[i].yVelocity *= 0.9;

        //If player is dead take away collision with floor
        if (playerArray.players[i].health > 1) {
            // if rectangle is falling below floor line
            if (playerArray.players[i].y > windowHeight - groundHeight - playerArray.players[i].height) {
                playerArray.players[i].y = windowHeight - groundHeight - playerArray.players[i].height;
                playerArray.players[i].jumping = false;
                playerArray.players[i].yVelocity = 0;
            }
        }
    }
}

export function boundaries() {
    for (let i = 0; i < playerNumber; i++) {
        // if player is going off the left of the screen
        if (playerArray.players[i].x < -playerSize) {
            playerArray.players[i].x = -10;
            playerArray.players[i].xVelocity = 0;
        }
        // if player goes past right boundary
        if (playerArray.players[i].x > windowWidth)
            playerArray.players[i].x = windowWidth;
    }
}