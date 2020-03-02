const Card = require('./card.js');

class Being extends Card {
  constructor(name, rulesText, cost, image, a, d, owner) {
    super(name, 'Being', rulesText, cost, image);
    this.a = a;
    this.d = d;
    this.hp = d;
    this.act = false;
    this.owner = owner;
  }
}

module.exports = Being;
