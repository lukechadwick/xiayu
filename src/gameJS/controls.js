import { 
    playerNumber, 
    playerArray, 
    duckHeight, 
    controlState,
    bulletsInWorld
} from "../index";

import { createBullet } from "./projectiles";

export function keyHandler(e) {
    var key_state = (event.type == "keydown") ? true : false;

    e.preventDefault()

    //Player Two
    if (e.keyCode == 65){
        controlState.aKey = key_state;
    }
    else if (e.keyCode == 87)
        controlState.wKey = key_state
    else if (e.keyCode == 68){
        controlState.dKey = key_state;
    }
    else if (e.keyCode == 83)
        controlState.sKey = key_state;
    else if (e.keyCode == 16) {
        controlState.shiftKey = key_state;

    if (!playerArray.players[0].reloading && (controlState.shiftKey))
        shoot(0);
    }

    //Player One
    if (e.keyCode == 37){
        controlState.left = key_state;
        playerArray.players[0].facingLeft = true;
    }
    else if (e.keyCode == 38)
        controlState.up = key_state
    else if (e.keyCode == 39)
    {
        controlState.right = key_state;
        playerArray.players[0].facingLeft = false;
    }
    else if (e.keyCode == 40)
        controlState.down = key_state;
    else if (e.keyCode == 32) {
        controlState.spaceKey = key_state;

    if (!playerArray.players[1].reloading && (controlState.spaceKey))
        shoot(1);
    }
}

export function shoot(num) {
    if (!playerArray.players[num].reloading) {
        bulletsInWorld++
        createBullet(num);
        playerArray.players[num].reloading = true;
    }
    if (playerArray.players[num].reloading) {
        setTimeout(function() {
            playerArray.players[num].reloading = false;
        }, 500);
    }
}

export function duck() {
    for (let i = 0; i < playerNumber; i++) {
        if (controlState.down) {
            playerArray.players[0].height = duckHeight;
        } else {
            playerArray.players[0].height = duckHeight * 2;
        }
        if (controlState.sKey) {
            playerArray.players[1].height = duckHeight;
        } else {
            playerArray.players[1].height = duckHeight * 2;
        }
    }
}