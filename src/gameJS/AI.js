import { 
    playerNumber, 
    playerArray,
 } from "../index";

 import { 
    shoot
 } from "./controls";


export function AI(){
    for (let p = 0; p < playerNumber; p++) {
        if (p > 2)

        //Ai Controls
        {
            playerArray.players[p].leftState = Math.random() >= 0.5;

            playerArray.players[p].upState = Math.random() >= 0.9;
        
            playerArray.players[p].rightState = Math.random() >= 0.5;
        
            playerArray.players[p].duckState = Math.random() >= 0.7;


            if (!playerArray.players[p].reloading && (Math.random() >= 0.7))
            shoot(p)
        
        }
    }
}





