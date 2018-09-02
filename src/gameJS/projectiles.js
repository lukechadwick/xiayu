import { 
    playerArray, 
    gameWindow, 
    bulletArray, 
    bulletRadius, 
    bulletVelocity, 
    windowHeight,
    windowWidth,
    boss
} from "../index";

export function createBullet(num) {
    let bulletsInWorld = bulletArray.bullets.length
    
    for (let i = bulletArray.bullets.length ; i < bulletsInWorld + 1; i++) {
        let dxMod, bulletOffset;

        //Spawn bullet to right of player
        if (num !== 'b'){
            if (!playerArray.players[num].facingLeft) {
                dxMod = bulletVelocity + Math.random();
                bulletOffset = 40;
            }
            //Spawn bullet to left of player
            if (playerArray.players[num].facingLeft) {
                dxMod = -bulletVelocity + Math.random();
                bulletOffset = -20;
            }
            bulletArray.bullets[i] = {
                "dx": dxMod,
                "dy": 0,
                'x': (playerArray.players[num].x + bulletOffset),
                'y': (playerArray.players[num].y + 15)
            }
        }
        else{
            bulletArray.bullets[i] = {
                "dx": Math.random() * (3 - -3) + -3,
                "dy": Math.random() * (3 - -3) + -3,
                'x': boss.x + 63,
                'y': boss.y + 63
            }
        }
    }
    //console.log('Bullets', bulletArray)
}

export function drawBullet() {
    //let bulletsOnScreen = 0
    for (let i = 0; i < bulletArray.bullets.length; i++) {
        //bulletsOnScreen = 0
        //Only draw bullets on screen
        if (bulletArray.bullets[i].y < windowHeight && bulletArray.bullets[i].x < windowWidth && bulletArray.bullets[i].x > 0){
            gameWindow.beginPath();
            gameWindow.arc(bulletArray.bullets[i].x, bulletArray.bullets[i].y, bulletRadius, 0, Math.PI * 2);
            gameWindow.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            gameWindow.fill();
            gameWindow.strokeStyle = "black";
            gameWindow.stroke();
            gameWindow.closePath();
            //bulletsOnScreen ++
        }
        else{
            //Cull offscreen bullets from array
            let deadBullets = bulletArray.bullets.splice(i, 1)
          //  console.log(bulletArray.bullets.length)
        }
    }
  //  console.log(bulletsOnScreen)
   // bulletsOnScreen = 0
}

export function ballSpeed() {
    for (let i = 0; i < bulletArray.bullets.length; i++) {
        bulletArray.bullets[i].x += bulletArray.bullets[i].dx;
        bulletArray.bullets[i].y += bulletArray.bullets[i].dy;
    }
}