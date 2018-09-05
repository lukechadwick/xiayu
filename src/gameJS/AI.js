import { 
    playerNumber, 
    playerArray,
 } from "../index";

 import { 
    shoot,
    isDucking
 } from "./controls";

export let realPlayers = 0

document.addEventListener('DOMContentLoaded', createEventListeners)

function createEventListeners() {
    document.getElementById("rp0").onclick = function() {realPlayers = 0};
    document.getElementById("rp1").onclick = function() {realPlayers = 1};
    document.getElementById("rp2").onclick = function() {realPlayers = 2};
}

export function AI(){
    for (let p = 0; p < playerNumber; p++) {
        if (p >= realPlayers)

        //Ai Controls
        {
            playerArray.players[p].leftState = Math.random() >= 0.5;

            playerArray.players[p].upState = Math.random() >= 0.9;
        
            playerArray.players[p].rightState = Math.random() >= 0.5;
        
            playerArray.players[p].duckState = Math.random() >= 0.9;

            if (!playerArray.players[p].reloading && (Math.random() >= 0.7))
            shoot(p)
        }
    }
    isDucking();
}





