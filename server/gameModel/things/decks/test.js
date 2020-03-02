const Resource = require('../resource.js');
const Deck = require('../deck.js');
const beings = require('../cards/beings.js');

class TestDeck extends Deck {
  constructor() {
    super(Array(20).fill(new Resource())
      .concat(Array(20).fill(new beings.Bear())));
  }
}

module.exports = TestDeck;
