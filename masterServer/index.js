const express = require("express");
const server = express();
const port = process.env.PORT || 1338;

let serverList = [];

app = server.listen(port, () => {
  console.log("Listening on port:", port);
});

//Start listening for connections
var socket = require("socket.io");
io = socket(app);

//Log when user connects/disconnects
io.on("connection", socket => {
  // console.log(socket);

  console.log("Server connected from:", socket.handshake.headers.host);
  socket.on("disconnect", () => {
    socket.disconnect();
  });
});
