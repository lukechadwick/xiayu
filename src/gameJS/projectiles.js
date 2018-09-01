import { 
    playerNumber, 
    playerArray, 
    gameWindow, 
    bulletArray, 
    bulletRadius, 
    bulletVelocity 
} from "../index";

export function createBullet(num) {
    let bulletsInWorld = bulletArray.bullets.length
    
    for (let i = bulletArray.bullets.length ; i < bulletsInWorld + 1; i++) {
        let dxMod, bulletOffset;

        //Spawn bullet to right of player
        if (!playerArray.players[num].facingLeft) {
            dxMod = bulletVelocity + Math.random(),
                bulletOffset = 40;
        }
        //Spawn bullet to left of player
        if (playerArray.players[num].facingLeft) {
            dxMod = -bulletVelocity + Math.random(),
                bulletOffset = -20;
        }
        bulletArray.bullets[i] = {
            "dx": dxMod,
            "dy": -bulletVelocity + Math.random(),
            'x': (playerArray.players[num].x + bulletOffset),
            'y': (playerArray.players[num].y + 15)
        }
        console.log(bulletArray)
    }
}

export function drawBullet() {
    for (let i = 0; i < playerNumber; i++) {
        for (let i = 0; i < bulletArray.bullets.length; i++) {
            gameWindow.beginPath();
            gameWindow.arc(bulletArray.bullets[i].x, bulletArray.bullets[i].y, bulletRadius, 0, Math.PI * 2);
            gameWindow.fillStyle = "#0095DD";
            gameWindow.fill();
            gameWindow.strokeStyle = "black";
            gameWindow.stroke();
            gameWindow.closePath();
        }
    }
}

export function ballSpeed() {
    for (let i = 0; i < bulletArray.bullets.length; i++) {
        bulletArray.bullets[i].x += bulletArray.bullets[i].dx;
        //  bulletArray.bullets[i].y += bulletArray.bullets[i].dy;  //move ball up and down / Y-axis
    }
}