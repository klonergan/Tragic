/* eslint-disable max-classes-per-file */
const Being = require('../being.js');

class Bear extends Being {
  constructor(owner) {
    super('Bear', '', 2, null, 2, 2, owner);
  }
}

class Turtle extends Being {
  constructor(owner) {
    super('Turtle', '', 3, null, 1, 4, owner);
  }
}

module.exports = { Bear, Turtle };
