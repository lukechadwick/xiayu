import { 
    playerArray, 
    playerNumber, 
    windowHeight, 
    windowWidth, 
    groundHeight, 
    platformArray,
    playerSize,
} from "../index";

export function physics() {
    for (let i = 0; i < playerNumber; i++) {


        //Player Movement
        if (playerArray.players[i].upState == true && playerArray.players[i].jumping == false) {
            playerArray.players[i].y_velocity -= 20;
            playerArray.players[i].jumping = true;  
        }
        
        if (playerArray.players[i].leftState){
            playerArray.players[i].facingLeft = true;
            playerArray.players[i].x_velocity -= 0.4;
        }
        
        if (playerArray.players[i].rightState)
        {
            playerArray.players[i].facingLeft = false;
            playerArray.players[i].x_velocity += 0.4;            
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
