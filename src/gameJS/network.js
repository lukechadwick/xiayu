import { playerArray, bulletArray, boss, platformArray } from "../index";
import { setTime, countDown, startGameTime } from "./boss";

//init socket
const io = require("socket.io-client");
let socket = io.connect("http://" + document.getElementById("ipAddress").value);
let socketMasterList = io.connect("http://127.0.0.1:1338");

export let client = 2;

document.addEventListener("DOMContentLoaded", createEventListeners);
function createEventListeners() {
  //Change IP address
  document.getElementById("connectToGame").onclick = () => {
    socket.io.uri = "http://" + document.getElementById("ipAddress").value;
  };

  //Set client/server flag
  document.getElementById("client").onclick = () => {
    socketMasterList.emit("requestServerList");

    client = 1;
  };
  document.getElementById("server").onclick = () => {
    client = 0;
  };
}

//Listeners for client
socket.on("playerSync", msg => {
  if (client == 1) playerArray.players = msg;
});
socket.on("projectileSync", msg => {
  if (client == 1) bulletArray.bullets = msg;
});
socket.on("platformSync", msg => {
  if (client == 1) platformArray.plat = msg;
});
socketMasterList.on("serverList", msg => {
  console.log(msg);
});

socket.on("controlSync", msg => {
  if (client == 0) {
    if (msg.control == "up") {
      playerArray.players[1].upState = msg.state;
    }
    if (msg.control == "duck") {
      playerArray.players[1].duckState = msg.state;
    }
    if (msg.control == "left") {
      playerArray.players[1].leftState = msg.state;
    }
    if (msg.control == "right") {
      playerArray.players[1].rightState = msg.state;
    }
    if (msg.control == "shoot") {
      playerArray.players[1].shootState = msg.state;
    }
  }
});

socket.on("bossSync", msg => {
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
socket.on("gameSync", msg => {
  if (client == 1) {
    setTime(msg.startGameTime, msg.countDown);
  }
});

export function sendData(socketName, msg) {
  socket.emit(socketName, msg);
}

//Have a sending service here if client
export function send() {
  //sockets send
  if (client == 0) {
    socket.emit("playerSync", playerArray.players);
    socket.emit("projectileSync", bulletArray.bullets);
    socket.emit("platformSync", platformArray.plat);
    socket.emit("bossSync", boss);
    socket.emit("gameSync", { countDown, startGameTime });
  }
}
