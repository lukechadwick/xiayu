import { 
    playerArray, 
    playerNumber, 
    bulletArray
} from "../index";

export function hitDetection() {
    let playerHit = isCollide(bulletArray.bullets, playerArray.players, 5, 0, 40, 0)
    if (playerHit){
        playerArray.players[playerHit[1]].health -= 10;
        bulletArray.bullets[playerHit[0]].y = bulletArray.bullets[playerHit[0]].y + 1000;
        console.log('Player ' + playerHit[1] + " Hit, Current Health: " + playerArray.players[playerHit[1]].health)
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

export function bulletCollision2() {
    if (isCollide(bulletArray.bullets, bulletArray.bullets, 5, 0, 5, 0))
        console.log('boing!')
}


function isCollide(object1, object2, offset1, offset2, offset3, offset4, id){
    for (let i = 0; i < object1.length; i++) {
        for (let j = 0; j < object2.length; j++) {
            if (object1[i].x - object2[j].x < offset1 && object1[i].x - object2[j].x > offset2 &&
                object1[i].y - object2[j].y < offset3 && object1[i].y - object2[j].y > offset4) {
                    return [i, j]
            }       
        }
    }            
}