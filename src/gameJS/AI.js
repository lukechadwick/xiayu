import { playerArray } from '../index';

import { shoot, isDucking } from './controls';

export let realPlayers = 0;

document.addEventListener('DOMContentLoaded', createEventListeners);

function createEventListeners() {
  //Retrieve amount of real players from game setup window
  document.getElementById('rp0').onclick = function() {
    realPlayers = 0;
  };
  document.getElementById('rp1').onclick = function() {
    realPlayers = 1;
  };
  document.getElementById('rp2').onclick = function() {
    realPlayers = 2;
  };
}

export function AI() {
  //p is how many real players there are, the rest will be controlled by AI
  for (let p = 0; p < playerArray.players.length; p++) {
    if (p >= realPlayers) {
      //Super-advanced Math.random() powered AI code
      playerArray.players[p].leftState = Math.random() >= 0.5;

      playerArray.players[p].upState = Math.random() >= 0.9;

      playerArray.players[p].rightState = Math.random() >= 0.5;

      playerArray.players[p].duckState = Math.random() >= 0.9;

      if (!playerArray.players[p].reloading && Math.random() >= 0.7) shoot(p);
    }
  }
  //Reset player height if not ducking
  isDucking();
}
