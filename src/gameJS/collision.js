import { 
    playerArray, 
    bulletArray,
    platformArray,
    playerNumber
} from "../index";

export function hitDetection() {
    let playerHit = detectCollision(bulletArray.bullets, playerArray.players, 20, 0, 40, 0)
    if (playerHit){
        playerArray.players[playerHit[1]].health -= 10;
        bulletArray.bullets[playerHit[0]].y = bulletArray.bullets[playerHit[0]].y + 1000;
        console.log('Player ' + playerHit[1] + " Hit, Current Health: " + playerArray.players[playerHit[1]].health)
    }      
}

export function isOnPlatform(){
    for (let i = 0; i < playerNumber; i++) {
        for (let j = 0; j < platformArray.plat.length; j++) {
            if (playerArray.players[i].y >  platformArray.plat[j].height - playerArray.players[i].height 
                && playerArray.players[i].y <  platformArray.plat[j].height
                && playerArray.players[i].x > platformArray.plat[j].startX -20 
                && playerArray.players[i].x < platformArray.plat[j].endX) {
                playerArray.players[i].jumping = false;

                if (playerArray.players[i].health > 1){
                    playerArray.players[i].yVelocity = 0;
                    playerArray.players[i].y = platformArray.plat[j].height - playerArray.players[i].height + 4;
                }
            }                 
        }
    }
}

export function bulletCollision() {
    let bulletHit = detectCollision(bulletArray.bullets, bulletArray.bullets, 5, -5, 5, -5)
    if (bulletHit){
        bulletArray.bullets[bulletHit[0]].dy = -5 * Math.random()
        bulletArray.bullets[ bulletHit[1]].dy = 5 * Math.random()
        console.log('Bullet collision between', 'Bullet:', bulletHit[0], '&', 'Bullet:', bulletHit[1])
    }
}

export function detectCollision(object1, object2, offset1, offset2, offset3, offset4){
    for (let i = 0; i < object1.length; i++) {
        for (let j = 0; j < object2.length; j++) {
            if (object1[i].x - object2[j].x < offset1 && object1[i].x - object2[j].x > offset2 &&
                object1[i].y - object2[j].y < offset3 && object1[i].y - object2[j].y > offset4) {
                    if (i != j)
                    return [i, j]
            }       
        }
    }            
}
