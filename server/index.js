/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
// import game models
const GameState = require('./gameModel/state.js');
const TestDeck = require('./gameModel/things/decks/test.js');

// set up an initial game state
let players = 0;
const p1Deck = new TestDeck(1);
p1Deck.shuffle();
const p2Deck = new TestDeck(2);
p2Deck.shuffle();
const state = new GameState(p1Deck.cards, p2Deck.cards);
for (let i = 0; i < 7; i += 1) {
  state.p1Hand.push(p1Deck.draw());
  state.p2Hand.push(p2Deck.draw());
}
const playerIds = {};


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
  players += 1;
  const player = players;
  playerIds[player] = socket.id;
  io.to(playerIds[player]).emit('state', state.private(player));

  socket.on('hi', (data) => {
    console.log('hi', data);
  });

  // io.to(`${player}`).emit('state', state.private(player));
  socket.on('pass', () => {
    state.pass(player);
    io.to(playerIds[1]).emit('state', state.private(1));
    io.to(playerIds[2]).emit('state', state.private(2));
  });
  // player gives play command with index of card clicked in their hand
  socket.on('play', (data) => {
    console.log('played: ', player, data);
    state.play(player, Number(data));
    io.to(playerIds[1]).emit('state', state.private(1));
    io.to(playerIds[2]).emit('state', state.private(2));
  });

  // attack command from player
  socket.on('attack', (data) => {
    state.attack(player, data);
    io.to(playerIds[1]).emit('state', state.private(1));
    io.to(playerIds[2]).emit('state', state.private(2));
  });

  // block command from player
  socket.on('block', (data) => {
    console.log('block: ', data);
    state.block(player, data);
  });
  // socket.on('hi', (data) => {
  //   io.sockets.emit('hi', data);
  //   console.log(data);
  // });
});


app.use(express.static(path.join(__dirname, '../client/dist')));
