import { playerArray, bulletArray, boss, platformArray } from '../index';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

let client = 0;

document.addEventListener('DOMContentLoaded', createEventListeners);
function createEventListeners() {
  //Set client/server flag
  document.getElementById('client').onclick = function() {
    client = 1;
  };
  document.getElementById('server').onclick = function() {
    client = 0;
  };
}

socket.on('playerSync', function(msg) {
  if (client == 1) playerArray.players = msg;
});

socket.on('projectileSync', function(msg) {
  if (client == 1) bulletArray.bullets = msg;
});

socket.on('platformSync', function(msg) {
  if (client == 1) platformArray.plat = msg;
});

socket.on('bossSync', function(msg) {
  // console.log(msg);

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

//Have a listen service here if server
export function listen() {
  //sockets listen
  if (client == 1) {
    // console.log('Recieving Packet:');
  }
}

//Have a sending service here if client
export function send() {
  //sockets send
  // console.log('Sending Packet:');
  if (client == 0) {
    socket.emit('playerSync', playerArray.players);
    socket.emit('projectileSync', bulletArray.bullets);
    socket.emit('platformSync', platformArray.plat);

    socket.emit('bossSync', boss);
  }
}

//List of things to sync in order of priority
//player array
//platform array
//controls/input state
//projectile array
//boss position
//window size

//If player is a client, the local arrays will be ignored or be overwritten and instead by used
//by those coming through the network as the packets come through

//Game runs at 60 fps so theoretically the updates will need to sync every 16.7ms, should be fine for
//LAN connections, unsure how this will behave under connections with higher latency

//Should eventually create a notification/network status for the client to let know when a client/server connects
//can use console in the meantime
