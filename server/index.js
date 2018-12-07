const express = require('express');
const server = express();
const port = process.env.PORT || 1337;

app = server.listen(port, () => {
  console.log('Listening on port:', port);
});

//Start listening for connections
var socket = require('socket.io');
io = socket(app);

//Log when user connects/disconnects
io.on('connection', socket => {
  console.log('User connected from:', socket.handshake.headers.host);
  socket.on('disconnect', () => {
    socket.disconnect();
  });
});

io.on('connection', socket => {
  socket.on('playerSync', msg => {
    io.emit('playerSync', msg);
  });
  socket.on('projectileSync', msg => {
    io.emit('projectileSync', msg);
  });
  socket.on('bossSync', msg => {
    io.emit('bossSync', msg);
  });
  socket.on('platformSync', msg => {
    io.emit('platformSync', msg);
  });
  socket.on('gameSync', msg => {
    io.emit('gameSync', msg);
  });
  socket.on('controlSync', msg => {
    io.emit('gameSync', msg);
  });
});
