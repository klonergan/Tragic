class Card {
  constructor(name, type, rulesText, cost, image) {
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.rulesText = rulesText;
    this.image = image;
  }
}

module.exports = Card;
