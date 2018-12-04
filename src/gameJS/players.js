import {
	playerArray,
	playerNumber,
	playerSize,
	gameWindow,
	windowWidth,
	windowHeight
} from '../index';
import { realPlayers } from './AI';

export function makePlayer() {
	playerArray.players = [];
	for (let i = 0; i < playerNumber + realPlayers; i++) {
		playerArray.players[i] = {
			height: playerSize,
			width: playerSize / 2,

			x: Math.random() * windowWidth,
			y: 0,
			xVelocity: 0,
			yVelocity: 0,
			reloading: false,
			health: 100,
			facingLeft: false,

			color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),

			jumpState: false,

			leftState: false,
			rightState: false,
			upState: false,
			duckState: false,
			shootState: false
		};
	}
}

export function drawPlayer() {
	for (let i = 0; i < playerArray.players.length; i++) {
		gameWindow.beginPath();
		gameWindow.fillStyle = playerArray.players[i].color; // hex for red

		if (i == 0) gameWindow.fillStyle = 'red';
		if (i == 1) gameWindow.fillStyle = 'yellow';
		if (i == 2) gameWindow.fillStyle = 'blue';
		if (i == 3) gameWindow.fillStyle = 'green';

		gameWindow.rect(
			playerArray.players[i].x,
			playerArray.players[i].y,
			playerArray.players[i].width,
			playerArray.players[i].height
		);
		gameWindow.fill();
		gameWindow.strokeStyle = 'black';
		gameWindow.stroke();
		gameWindow.closePath();

		//Draw Eye
		gameWindow.beginPath();
		gameWindow.arc(
			playerArray.players[i].x + 5,
			playerArray.players[i].y + 5,
			2,
			0,
			2 * Math.PI
		);
		gameWindow.stroke();
		gameWindow.beginPath();
		gameWindow.arc(
			playerArray.players[i].x + 15,
			playerArray.players[i].y + 5,
			2,
			0,
			2 * Math.PI
		);
		gameWindow.stroke();

		//Nose
		gameWindow.beginPath();
		gameWindow.arc(
			playerArray.players[i].x + 10,
			playerArray.players[i].y + 9,
			1,
			0,
			2 * Math.PI
		);
		gameWindow.stroke();

		//Mouth
		let emotion = 0;
		playerArray.players[i].health < 30
			? (emotion = 2 * Math.PI)
			: (emotion = Math.PI);

		gameWindow.beginPath();
		gameWindow.arc(
			playerArray.players[i].x + 10,
			playerArray.players[i].y + 15,
			3,
			0,
			emotion
		);
		gameWindow.stroke();

		if (!playerArray.players[i].facingLeft) {
			//Gun
			gameWindow.beginPath();
			gameWindow.moveTo(
				playerArray.players[i].x + 20,
				playerArray.players[i].y + 15
			);
			gameWindow.lineTo(
				playerArray.players[i].x + 20,
				playerArray.players[i].y + 20
			);
			gameWindow.lineTo(
				playerArray.players[i].x + 25,
				playerArray.players[i].y + 15
			);
			gameWindow.lineTo(
				playerArray.players[i].x + 30,
				playerArray.players[i].y + 15
			);
			gameWindow.lineTo(
				playerArray.players[i].x + 20,
				playerArray.players[i].y + 15
			);
			gameWindow.stroke();
		} else {
			//left gun
			gameWindow.beginPath();
			gameWindow.moveTo(
				playerArray.players[i].x - 20 + 20,
				playerArray.players[i].y + 15
			);
			gameWindow.lineTo(
				playerArray.players[i].x - 20 + 20,
				playerArray.players[i].y + 20
			);
			gameWindow.lineTo(
				playerArray.players[i].x - 25 + 20,
				playerArray.players[i].y + 15
			);
			gameWindow.lineTo(
				playerArray.players[i].x - 30 + 20,
				playerArray.players[i].y + 15
			);
			gameWindow.lineTo(
				playerArray.players[i].x - 20 + 20,
				playerArray.players[i].y + 15
			);
			gameWindow.stroke();
		}

		if (playerArray.players[i].y > windowHeight) {
			let deadPlayers = playerArray.players.splice(i, 1);
		}
	}
}
