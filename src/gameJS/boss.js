import { 
    boss, 
    gameWindow, 
    windowWidth
} from "../index";

export function bossBehavior () {

    if (boss.bossX > windowWidth){
        boss.state = 'left';
        console.log ('Boss status: Moving:', boss.state)
    }

    else if (boss.bossX < 50) {
        boss.state = 'right'
        console.log ('Boss status: Moving:', boss.state)
    }

    if (boss.state == 'left'){
        boss.bossX *= 0.99
        boss.bossY *= .99
    }

    else if (boss.state == 'right'){
        boss.bossY *= 1.01
        boss.bossX *= 1.01;
    }
}

export function drawBoss() {
    let drawing = new Image();
    drawing.src = "./assets/boss.png"; // can also be a remote URL e.g. http://
    gameWindow.drawImage(drawing, boss.bossX +  + Math.random() * 5,  boss.bossY +  + Math.random() * 5);
}