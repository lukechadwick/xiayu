import {
    playerArray,
    bulletArray,
    platformArray,
    playerNumber
} from "../index";

export function hitDetection() {
    for (let i = 0; i < bulletArray.bullets.length; i++) {
        for (let j = 0; j < playerArray.players.length; j++) {
            if (bulletArray.bullets[i].x - playerArray.players[j].x < 20 && bulletArray.bullets[i].x - playerArray.players[j].x > 0 &&
                bulletArray.bullets[i].y - playerArray.players[j].y < 40 && bulletArray.bullets[i].y - playerArray.players[j].y > 0) {
                playerArray.players[[j]].health -= 10;
                bulletArray.bullets[[i]].y = bulletArray.bullets[[i]].y + 1000;
                console.log('Player ' + [j] + " Hit, Current Health: " + playerArray.players[[j]].health)
            }
        }
    }
}

export function isOnPlatform() {
    for (let i = 0; i < playerNumber; i++) {
        for (let j = 0; j < platformArray.plat.length; j++) {
            if (playerArray.players[i].y > platformArray.plat[j].y - playerArray.players[i].height &&
                playerArray.players[i].y < platformArray.plat[j].y &&
                playerArray.players[i].x > platformArray.plat[j].x - 20 &&
                playerArray.players[i].x < platformArray.plat[j].endX) {
                playerArray.players[i].jumping = false;

                if (playerArray.players[i].health > 1) {
                    playerArray.players[i].yVelocity = 0;
                    playerArray.players[i].y = platformArray.plat[j].y - playerArray.players[i].height + 4;
                }
            }
        }
    }
}

export function bulletCollision() {
    for (let i = 0; i < bulletArray.bullets.length; i++) {
        for (let j = 0; j < bulletArray.bullets.length; j++) {
            if (bulletArray.bullets[i].x - bulletArray.bullets[j].x < 5 && bulletArray.bullets[i].x - bulletArray.bullets[j].x > -5 &&
                bulletArray.bullets[i].y - bulletArray.bullets[j].y < 5 && bulletArray.bullets[i].y - bulletArray.bullets[j].y > -5) {
                if (i != j) {
                    bulletArray.bullets[[i]].dy = -5 * Math.random()
                    bulletArray.bullets[[j]].dy = 5 * Math.random()

                }
            }
        }
    }
}

// //Generic collision function
// export function detectCollision(object1, object2, offset1, offset2, offset3, offset4) {
//     let collisionArray = []
//     for (let i = 0; i < object1.length; i++) {
//         for (let j = 0; j < object2.length; j++) {
//             if (object1[i].x - object2[j].x < offset1 && object1[i].x - object2[j].x > offset2 &&
//                 object1[i].y - object2[j].y < offset3 && object1[i].y - object2[j].y > offset4) {
//                 if (i != j)
//                     collisionArray.push([i, j])
//             }
//         }
//     }
//     if (collisionArray.length != 0)
//         return collisionArray
// }

// export function isOnPlatform() {
//     let a = detectCollision(playerArray.players, platformArray.plat, 50, -20, 0, -36)
//     if (a) {

//         for (let i = 0; i < arguments.length; i++) {
//             for (let j = 0; j < array.length; j++) {
//                 playerArray.players[a[i][0]].jumping = false;

//                 if (playerArray.players[a[i][0]].health > 1) {
//                     playerArray.players[a[i][0]].yVelocity = 0;
//                     playerArray.players[a[i][0]].y = platformArray.plat[a[j][1]].y - 36;
//                 }
//             }
//         }
//         console.log(a.length);

//         playerArray.players[a[0][0]].jumping = false;

//         if (playerArray.players[a[0][0]].health > 1) {
//             playerArray.players[a[0][0]].yVelocity = 0;
//             playerArray.players[a[0][0]].y = platformArray.plat[a[0][1]].y - 36;
//         }
//     }
// }