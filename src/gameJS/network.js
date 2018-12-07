import { playerArray, bulletArray, boss, platformArray } from '../index';
import { setTime, countDown, startGameTime } from './boss';

const io = require('socket.io-client');
let socket = io.connect('http://' + document.getElementById('ipAddress').value);

export let client = 2;

document.addEventListener('DOMContentLoaded', createEventListeners);
function createEventListeners() {
  //Change IP address
  document.getElementById('connectToGame').onclick = function() {
    socket.io.uri = 'http://' + document.getElementById('ipAddress').value;
  };

  //Set client/server flag
  document.getElementById('client').onclick = function() {
    client = 1;
  };
  document.getElementById('server').onclick = function() {
    client = 0;
  };
}

//Listeners for client
socket.on('playerSync', function(msg) {
  if (client == 1) playerArray.players = msg;
});
socket.on('projectileSync', function(msg) {
  if (client == 1) bulletArray.bullets = msg;
});
socket.on('platformSync', function(msg) {
  if (client == 1) platformArray.plat = msg;
});
socket.on('controlSync', function(msg) {
  if (client == 1) platformArray.plat = msg;
});
socket.on('bossSync', function(msg) {
  if (client == 1) {
    boss.x = msg.x;
    boss.y = msg.y;
    boss.ammo = msg.ammo;
    boss.dx = msg.dx;
    boss.dy = msg.dy;
    boss.health = msg.health;
    boss.state = msg.state;
  }
});
socket.on('gameSync', function(msg) {
  if (client == 1) {
    setTime(msg.startGameTime, msg.countDown);
  }
});

//Have a sending service here if client
export function send() {
  //sockets send
  if (client == 0) {
    socket.emit('playerSync', playerArray.players);
    socket.emit('projectileSync', bulletArray.bullets);
    socket.emit('platformSync', platformArray.plat);
    socket.emit('bossSync', boss);
    socket.emit('gameSync', { countDown, startGameTime });
  }
}
