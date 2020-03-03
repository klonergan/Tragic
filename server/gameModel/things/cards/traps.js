const Trap = require('../trap.js');

const StrengthImage = 'https://cdn0.iconfinder.com/data/icons/fitness-95/24/strength-512.png';

class Strength extends Trap {
  constructor(owner) {
    const effect = function (card) {
      if (card.type === 'being') {
        card.a += 3;
        card.hp += 3;
      }
    };
    super('Strenth', 'Gives +3/+3 to chosen creature', 1, StrengthImage, effect, owner);
    this.targets = 1;
  }
}

module.exports = {
  Strength,
};
