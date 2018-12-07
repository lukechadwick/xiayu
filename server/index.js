// require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 3000;

app = server.listen(port, function() {
  console.log('Listening on port:', port);
});

//Start listening for connections
var socket = require('socket.io');
io = socket(app);

//Log when user connects/disconnects
io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('disconnect', function() {});
});

io.on('connection', function(socket) {
  socket.on('playerSync', function(msg) {
    io.emit('playerSync', msg);
  });
});

io.on('connection', function(socket) {
  socket.on('projectileSync', function(msg) {
    io.emit('projectileSync', msg);
  });
});

io.on('connection', function(socket) {
  socket.on('bossSync', function(msg) {
    io.emit('bossSync', msg);
  });
});

io.on('connection', function(socket) {
  socket.on('platformSync', function(msg) {
    io.emit('platformSync', msg);
  });
});

io.on('connection', function(socket) {
  socket.on('gameSync', function(msg) {
    io.emit('gameSync', msg);
  });
});
