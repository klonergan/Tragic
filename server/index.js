const express = require('express');
const path = require('path');
const socket = require('socket.io');

// express set up
const app = express();
const port = 80;
const server = app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

// socket.io set up
const io = socket(server, { pingTimeout: 10000, pingInterval: 5000 });
io.on('connection', (sock) => {
  console.log('made socket connection', sock.id);
  // sock.on('trigger', () => {})
  io.sockets.emit('follow', { key: 'value' });
  sock.on('hi', (data) => {
    io.sockets.emit('hi', data);
    console.log(data);
  });
});


app.use(express.static(path.join(__dirname, '../client/dist')));
