const Being = require('../being.js');

class Bear extends Being {
  constructor() {
    super('Bear', '', 2, null, 2, 2);
  }
}

module.exports = { Bear };
