import { 
    playerArray, 
    playerNumber, 
    bulletArray
} from "../index";

export function hitDetection() {
    for (let i = 0; i < bulletArray.bullets.length; i++) {
        for (let j = 0; j < playerNumber; j++) {
            if (bulletArray.bullets[i].x - playerArray.players[j].x < 5 && bulletArray.bullets[i].x - playerArray.players[j].x > 0 &&
                bulletArray.bullets[i].y - playerArray.players[j].y < 40 && bulletArray.bullets[i].y - playerArray.players[j].y > 0) {
                
                //Move bullet out of world
                bulletArray.bullets[i].y = bulletArray.bullets[i].y + 1000;
                
                playerArray.players[j].health -= 10;
                console.log('Player ' + j + " Hit, Current Health: " + playerArray.players[j].health)
            }
        }
    }
}

export function bulletCollision() {
    for (let i = 0; i < bulletArray.bullets.length; i++) {
        for (let j = 0; j < bulletArray.bullets.length; j++) {
            if (bulletArray.bullets[i].x - bulletArray.bullets[j].x < 5 && bulletArray.bullets[i].x - bulletArray.bullets[j].x > 0 &&
                bulletArray.bullets[i].y - bulletArray.bullets[j].y < 5 && bulletArray.bullets[i].y - bulletArray.bullets[j].y > 0) {
                  //  bulletArray.bullets[i].dx = -bulletArray.bullets[i].dx;
                  //  bulletArray.bullets[j].dy = -bulletArray.bullets[j].dy;
                    console.log('boing!')
            }
        }
    }
}