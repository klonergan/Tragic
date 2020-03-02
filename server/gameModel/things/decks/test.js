const Resource = require('../resource.js');
const Deck = require('../deck.js');
const beings = require('../cards/beings.js');

class TestDeck extends Deck {
  constructor(owner) {
    super(Array(17).fill(new Resource(owner))
      .concat(Array(13).fill(new beings.Bear(owner)))
      .concat(Array(10).fill(new beings.Turtle(owner))));
  }
}

module.exports = TestDeck;
