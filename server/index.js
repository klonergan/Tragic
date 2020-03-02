const express = require('express');
const path = require('path');
const socketio = require('socket.io');
// import game models
const TestDeck = require('./gameModel/things/decks/test.js');

const p1Deck = new TestDeck();
p1Deck.cards[0] = 1;
const a = p1Deck.cards;
console.log(a);
p1Deck.shuffle.call(p1Deck);
console.log(a);


// express set up
const app = express();
const port = 80;
const server = app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

// socket.io set up
const io = socketio(server, { pingTimeout: 10000, pingInterval: 5000 });
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  // socket.on('trigger', () => {})
  io.sockets.emit('follow', { key: 'value' });
  socket.on('hi', (data) => {
    io.sockets.emit('hi', data);
    console.log(data);
  });
});


app.use(express.static(path.join(__dirname, '../client/dist')));
