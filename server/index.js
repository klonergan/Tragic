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
const io = socket(server);
io.on('connection', (sock) => {
  console.log('made socket connection', sock.id);
});

//
app.use(express.static(path.join(__dirname, '../client/dist')));
