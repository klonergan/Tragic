const Card = require('./card.js');

class Resource extends Card {
  constructor(owner) {
    super('Resource', 'Resource', 'Play to add one to your resource count. Can play one on each of your turns');
    this.act = false;
    this.owner = owner;
  }
}

module.exports = Resource;
