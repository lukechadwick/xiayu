import { 
    platformArray, 
    gameWindow, 
    windowWidth,
    windowHeight
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

    for (let f = 0; f < windowHeight / 300; f++) {
    
        for (let i = 0; i < windowWidth / 50; i++) {
            let randomPoint = Math.random() * (i*50 - i*50) + i*50
            platformArray.plat[platformArray.plat.length] = {
                x: randomPoint,
                endX: randomPoint + 50,
                y: Math.random() * (windowHeight - 80 - 50) + 50
            }
        }
    }
    console.log('Platforms:', platformArray)

}