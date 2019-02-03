const express = require("express");
const server = express();
const port = process.env.PORT || 1338;

let serverList = [];

const app = server.listen(port, () => {
  console.log("Listening on port:", port);
});

//Start listening for connections
var socket = require("socket.io");
io = socket(app);

checkDuplicate = connection => {
  if (serverList.find(element => element == connection)) {
    return true;
  }
};

removeServer = connection => {
  let index = serverList.indexOf(connection);
  if (index !== -1) serverList.splice(index, 1);
};

//Log when server connects/disconnects
io.on("connection", socket => {
  if (!checkDuplicate(socket.handshake.headers.host)) {
    serverList.push(socket.handshake.headers.host);
  }

  console.log("Server connected from:", socket.handshake.headers.host);
  console.log("Current Servers:", serverList);

  socket.on("disconnect", e => {
    console.log(socket.handshake.headers.host, "Disconnected");
    removeServer(socket.handshake.headers.host);
    console.log("Current Servers:", serverList);
    socket.disconnect();
  });
});

//Simple http get request for server list
server.get("/listRequest", function(req, res) {
  console.log(req.headers.host, "requested server list.");
  res.send(serverList);
});
