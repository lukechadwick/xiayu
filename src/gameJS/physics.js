import { 
    playerArray, 
    playerNumber, 
    controlState, 
    windowHeight, 
    windowWidth, 
    groundHeight, 
    platformArray,
    playerSize,
} from "../index";

export function physics() {
    for (let i = 0; i < playerNumber; i++) {
        //Player one controls
        if (controlState.up && playerArray.players[0].jumping == false) {
            playerArray.players[0].y_velocity -= 20;
            playerArray.players[0].jumping = true;
        }
        if (controlState.left){
            playerArray.players[0].facingLeft = true;
            playerArray.players[0].x_velocity -= 0.2;
        }
        
        if (controlState.right)
        {
            playerArray.players[0].facingLeft = false;
            playerArray.players[0].x_velocity += 0.2;            
        }

        //Player 2 Controls
        if (controlState.wKey && playerArray.players[1].jumping == false) {
            playerArray.players[1].y_velocity -= 20;
            playerArray.players[1].jumping = true;
        }
        if (controlState.aKey){
            playerArray.players[1].x_velocity -= 0.2;
            playerArray.players[1].facingLeft = true;
        }

        if (controlState.dKey){
            playerArray.players[1].facingLeft = false;
            playerArray.players[1].x_velocity += 0.2;
        }
 
        // gravity
        playerArray.players[i].y_velocity += 1.2;
        playerArray.players[i].x += playerArray.players[i].x_velocity;
        playerArray.players[i].y += playerArray.players[i].y_velocity;

        // friction
        playerArray.players[i].x_velocity *= 0.9;
        playerArray.players[i].y_velocity *= 0.9;

        //If player is dead take away collision with floor
        if (playerArray.players[i].health > 1){
        // if rectangle is falling below floor line
            if (playerArray.players[i].y > windowHeight - groundHeight - playerArray.players[i].height) {
                playerArray.players[i].jumping = false;
                playerArray.players[i].y = windowHeight - groundHeight - playerArray.players[i].height;
                    
                playerArray.players[i].y_velocity = 0;
            }

            //Platform collision
            for (let j = 0; j < 7; j++) {
                if (playerArray.players[i].y >  platformArray.plat[j].height - playerArray.players[i].height 
                    && playerArray.players[i].y <  platformArray.plat[j].height
                    && playerArray.players[i].x > platformArray.plat[j].startX -20 
                    && playerArray.players[i].x < platformArray.plat[j].endX) {
                    playerArray.players[i].jumping = false;
                    
                    playerArray.players[i].y = platformArray.plat[j].height - playerArray.players[i].height;
                    playerArray.players[i].y_velocity = 0;
                }                 
            }
        }
    }
}

export function boundaries() {
    for (let i = 0; i < playerNumber; i++) {
        // if player is going off the left of the screen
        if (playerArray.players[i].x < -playerSize) {
            playerArray.players[i].x = -10;
            playerArray.players[i].x_velocity = 0;
        }
        // if player goes past right boundary
        if (playerArray.players[i].x > windowWidth)
            playerArray.players[i].x = windowWidth;
    }
}
