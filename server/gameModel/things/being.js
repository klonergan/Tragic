const Card = require('./card.js');

class Being extends Card {
  constructor(name, rulesText, cost, image, a, d) {
    super(name, 'Being', rulesText, cost, image);
    this.a = a;
    this.d = d;
    this.hp = d;
    this.act = false;
  }
}

module.exports = Being;
