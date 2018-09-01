import { 
    playerArray, 
    playerNumber, 
    gameWindow, 
} from "../index";

export function drawHealthBar() {
    for (let j = 0; j < playerNumber; j++) {
        
        //Health Colors
        if (playerArray.players[j].health < 21)
            gameWindow.fillStyle = "red"
        else if (playerArray.players[j].health < 51)
            gameWindow.fillStyle = "orange"
        else
            gameWindow.fillStyle = "#2aff00"
        
        //Draw Health Bar
        gameWindow.beginPath();
        gameWindow.rect(playerArray.players[j].x -5 , playerArray.players[j].y -15 , playerArray.players[j].health / 3.3, 5);
        gameWindow.fill();
        gameWindow.strokeStyle = "black";
        gameWindow.stroke();
        gameWindow.closePath();
    }

    
}