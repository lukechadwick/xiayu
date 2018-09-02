import { 
    platformArray, 
    gameWindow 
} from "../index";

export function drawPlatform() {
    for (let i = 0; i < platformArray.plat.length; i++) {

        gameWindow.beginPath();
        gameWindow.fillStyle = "#ff4300"; // hex for red
        gameWindow.rect(platformArray.plat[i].x, platformArray.plat[i].y, platformArray.plat[i].endX - platformArray.plat[i].x, 10);
        gameWindow.fill();
        gameWindow.strokeStyle = "black";
        gameWindow.stroke();
        gameWindow.closePath();

        for (let j = 0; j < 6; j++) {
            gameWindow.strokeStyle = "black";
            gameWindow.beginPath();
            gameWindow.moveTo(platformArray.plat[i].x + (j * 10),platformArray.plat[i].y);
            gameWindow.lineTo(platformArray.plat[i].x + (j * 10),platformArray.plat[i].y + 10);
            gameWindow.stroke();
            gameWindow.closePath();
        }
    }  
}

export function generatePlatform() {
    for (let i = 0; i < 7; i++) {
        let randomPoint = Math.random() * (i*100 - i*100) + i*100
        platformArray.plat[i] = {
            x: randomPoint,
            endX: randomPoint + 50,
            y: Math.random() * (200 - 80) + 80
        }
    }
    console.log('Platforms:', platformArray)
}