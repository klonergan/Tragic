const Card = require('./card.js');

class Trap extends Card {
  constructor(name, rulesText, cost, image, effect, owner) {
    super(name, 'trap', rulesText, cost, image);
    this.owner = owner;
    this.effect = effect;
    this.target = null;
    this.targets = 0;
  }
}

module.exports = Trap;
