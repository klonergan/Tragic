/* eslint-disable max-classes-per-file */
const Being = require('../being.js');

const bearImage = 'https://api.time.com/wp-content/uploads/2018/05/bear-pepper-spray.jpg?w=800&quality=85';
const turtleImage = 'https://i.dailymail.co.uk/i/newpix/2018/04/20/10/4B58A4A500000578-0-image-a-44_1524215178762.jpg';

class Bear extends Being {
  constructor(owner) {
    super('Bear', 'Bear noises intensify', 2, bearImage, 2, 2, owner);
  }
}

class Turtle extends Being {
  constructor(owner) {
    super('Turtle', 'Slow and Steady wins the race', 3, turtleImage, 1, 4, owner);
  }
}

module.exports = { Bear, Turtle };
