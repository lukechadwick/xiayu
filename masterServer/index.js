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
  if (!checkDuplicate(socket.request.connection.remoteAddress + ":1337")) {
    serverList.push(socket.request.connection.remoteAddress + ":1337");
  }

  console.log(
    "Server connected from:",
    socket.request.connection.remoteAddress + ":1337"
  );
  console.log("Current Servers:", serverList);

  socket.on("disconnect", e => {
    console.log(
      socket.request.connection.remoteAddress + ":1337",
      "Disconnected"
    );
    //removeServer(socket.request.connection.remoteAddress + ':1337");
    console.log("Current Servers:", serverList);
    socket.disconnect();
  });

  //Send server list to clients/servers when requested
  socket.on("requestServerList", msg => {
    console.log(socket.request.connection.remote, "requested server list.");
    io.emit("serverList", serverList);
  });
});

//Simple http get request for server list
server.get("/listRequest", function(req, res) {
  console.log(req.headers.host, "requested server list.");
  res.send(serverList);
});
