import { 
    playerNumber, 
    playerArray, 
    duckHeight, 
 } from "../index";

import { createBullet } from "./projectiles";

export function keyHandler(e) {
    var key_state = (event.type == "keydown") ? true : false;

    e.preventDefault()

    for (let p = 0; p < playerNumber; p++) {

        if (p < 2){
            if (e.keyCode == (p == 0 ?  65 : 37))
            playerArray.players[p].leftState = key_state;
            if (e.keyCode == (p == 0 ?  87 : 38))
                playerArray.players[p].upState = key_state;

            if (e.keyCode == (p == 0 ?  68 : 39))
                playerArray.players[p].rightState = key_state;
        
            if (e.keyCode == (p == 0 ?  83 : 40))
                playerArray.players[p].duckState = key_state;
        
            if (e.keyCode == (p == 0 ?  32 : 16))
                playerArray.players[p].shootState = key_state;
        
            if (!playerArray.players[p].reloading && (playerArray.players[p].shootState))
                shoot(p);
        }
    }
    isDucking();
}

export function shoot(num) {
    if (!playerArray.players[num].reloading) {
        createBullet(num);
        playerArray.players[num].reloading = true;
    }
    if (playerArray.players[num].reloading) {
        setTimeout(function() {
            playerArray.players[num].reloading = false;
        }, 500);
    }
}

function isDucking() {
    for (let i = 0; i < playerNumber; i++) {
        playerArray.players[i].duckState ? 
        playerArray.players[i].height = duckHeight : playerArray.players[i].height = duckHeight * 2
    }
}