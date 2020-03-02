class Card {
  constructor(name, type, rulesText, cost, image, owner) {
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.rulesText = rulesText;
    this.image = image;
    this.owner = owner;
  }
}

module.exports = Card;
