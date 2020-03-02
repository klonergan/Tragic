const Resource = require('../resource.js');
const Deck = require('../deck.js');
const beings = require('../cards/beings.js');

class TestDeck extends Deck {
  constructor(owner) {
    const deckArr = [];
    for (let i = 0; i < 17; i++) {
      deckArr.push(new Resource(owner));
    }
    for (let i = 0; i < 13; i++) {
      deckArr.push(new beings.Bear(owner));
    }
    for (let i = 0; i < 10; i++) {
      deckArr.push(new beings.Turtle(owner));
    }
    //  super(Array(17).fill(new Resource(owner))
    //   .concat(Array(13).fill(new beings.Bear(owner)))
    //   .concat(Array(10).fill(new beings.Turtle(owner))));
    super(deckArr);
  }
}

module.exports = TestDeck;
