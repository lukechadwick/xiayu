import { 
    playerArray, 
    playerNumber, 
    playerSize, 
    gameWindow, 
    windowWidth 
} from "../index";

export function makePlayer() {
    for (let i = 0; i < playerNumber; i++) {
        playerArray.players[i] = {
            height: playerSize,
            width: playerSize / 2,



            x: (Math.random() * (windowWidth - 0) + 0),
            y: 0,
            x_velocity: 0,
            y_velocity: 0,
            reloading: false,
            health: 100,
            facingLeft: false,

            jumpState: false,
            
            leftState: false,
            rightState: false,
            upState: false,
            duckState: false,
            shootState: false,
        }
        console.log(playerArray)
    }
}

export function drawPlayer() {
    for (let i = 0; i < playerNumber; i++) {
        gameWindow.beginPath();
        gameWindow.fillStyle = "red"; // hex for red

        if (i > 0)
            gameWindow.fillStyle = "yellow";

        gameWindow.rect(playerArray.players[i].x, playerArray.players[i].y, playerArray.players[i].width, playerArray.players[i].height);
        gameWindow.fill();
        gameWindow.strokeStyle = "black";
        gameWindow.stroke();
        gameWindow.closePath();



        //Draw Eye
        gameWindow.beginPath();
        gameWindow.arc(playerArray.players[i].x + 5, playerArray.players[i].y + 5,2,0,2*Math.PI);
        gameWindow.stroke();
        gameWindow.beginPath();
        gameWindow.arc(playerArray.players[i].x + 15, playerArray.players[i].y + 5,2,0,2*Math.PI);
        gameWindow.stroke();
    
        //Nose
        gameWindow.beginPath();
        gameWindow.arc(playerArray.players[i].x + 10, playerArray.players[i].y + 9,1,0,2*Math.PI);
        gameWindow.stroke();

        //Mouth
        let emotion = 0;

        if (playerArray.players[i].health < 30)
            emotion = 2*Math.PI;
        else
            emotion = Math.PI
        gameWindow.beginPath();
        gameWindow.arc(playerArray.players[i].x + 10, playerArray.players[i].y + 15,3,0, emotion);
        gameWindow.stroke();

        if (!playerArray.players[i].facingLeft)
        {
        //Gun
        gameWindow.beginPath();
        gameWindow.moveTo(playerArray.players[i].x + 20, playerArray.players[i].y + 15);
        gameWindow.lineTo(playerArray.players[i].x + 20, playerArray.players[i].y + 20);
        gameWindow.lineTo(playerArray.players[i].x + 25, playerArray.players[i].y + 15);
        gameWindow.lineTo(playerArray.players[i].x + 30, playerArray.players[i].y + 15);
        gameWindow.lineTo(playerArray.players[i].x + 20, playerArray.players[i].y + 15);
        gameWindow.stroke();
        }

        if (playerArray.players[i].facingLeft)
        {
        //left gun
        gameWindow.beginPath();
        gameWindow.moveTo(playerArray.players[i].x - 20 + 20, playerArray.players[i].y + 15);
        gameWindow.lineTo(playerArray.players[i].x - 20 + 20, playerArray.players[i].y + 20);
        gameWindow.lineTo(playerArray.players[i].x - 25 + 20, playerArray.players[i].y + 15);
        gameWindow.lineTo(playerArray.players[i].x - 30 + 20, playerArray.players[i].y + 15);
        gameWindow.lineTo(playerArray.players[i].x - 20 + 20, playerArray.players[i].y + 15);
        gameWindow.stroke();
        }
        
    }
}