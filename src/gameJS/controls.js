import { playerArray, duckHeight, setupGame } from '../index';

import { createBullet } from './projectiles';
import { client, sendData } from './network';
document.addEventListener('DOMContentLoaded', createEventListeners);

//Onclick events for game setup and win/loss screens
function createEventListeners() {
  var beginClick = document.getElementById('startGame');
  beginClick.onclick = beginGame;
  var restartClick = document.getElementById('restartGame');
  restartClick.onclick = restartGame;
  var restartClickWin = document.getElementById('restartGameWin');
  restartClickWin.onclick = restartGame;
}

export function beginGame() {
  setupGame();
}

function restartGame() {
  window.location.reload(false);
}

export function keyHandler(e) {
  var key_state = event.type == 'keydown' ? true : false;

  //e.preventDefault()

  //checks keycodes against player one and two to detect keyboard input
  for (let p = 0; p < playerArray.players.length; p++) {
    if (p < 2 && client != 1) {
      if (e.keyCode == (p == 0 ? 65 : 37))
        playerArray.players[p].leftState = key_state;
      if (e.keyCode == (p == 0 ? 87 : 38))
        playerArray.players[p].upState = key_state;

      if (e.keyCode == (p == 0 ? 68 : 39))
        playerArray.players[p].rightState = key_state;

      if (e.keyCode == (p == 0 ? 83 : 40))
        playerArray.players[p].duckState = key_state;

      if (e.keyCode == (p == 0 ? 32 : 16))
        playerArray.players[p].shootState = key_state;

      if (
        !playerArray.players[p].reloading &&
        playerArray.players[p].shootState
      )
        shoot(p);
    } else if (client == 1) {
      if (e.keyCode == (p == 0 ? 65 : 37)) sendData('controlSync', 'left');
      if (e.keyCode == (p == 0 ? 87 : 38)) sendData('controlSync', 'up');
      if (e.keyCode == (p == 0 ? 68 : 39)) sendData('controlSync', 'right');

      if (e.keyCode == (p == 0 ? 83 : 40)) sendData('controlSync', 'duck');
      if (e.keyCode == (p == 0 ? 32 : 16)) sendData('controlSync', 'shoot');
      if (
        !playerArray.players[p].reloading &&
        playerArray.players[p].shootState
      )
        shoot(p);
    }
  }
  isDucking();
}

//If player isn't reloading, then shoot, if player isnt reloading then set reload timer after shooting
export function shoot(num) {
  if (!playerArray.players[num].reloading) {
    createBullet(num);
    playerArray.players[num].reloading = true;
  }
  if (playerArray.players[num].reloading) {
    setTimeout(function() {
      playerArray.players[num].reloading = false;
    }, 400);
  }
}

//Check for ducking state and reduce player height if true
export function isDucking() {
  for (let i = 0; i < playerArray.players.length; i++) {
    playerArray.players[i].duckState
      ? (playerArray.players[i].height = duckHeight)
      : (playerArray.players[i].height = duckHeight * 2);
  }
}
