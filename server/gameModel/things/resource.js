const Card = require('./card.js');

const resourceImage = 'https://i.ytimg.com/vi/cTVcKfjIxNI/maxresdefault.jpg';

class Resource extends Card {
  constructor(owner) {
    super('Resource', 'resource', 'Play to add one to your resource count. Can play one on each of your turns', 0, resourceImage);
    this.act = false;
    this.owner = owner;
    this.cost = 0;
  }
}

module.exports = Resource;
