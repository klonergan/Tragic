const Card = require('./card.js');

class Resource extends Card {
  constructor() {
    super('Resource', 'Resource', 'Play to add one to your resource count. Can play one on each of your turns');
    this.act = false;
  }
}

module.exports = Resource;
