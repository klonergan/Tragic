class Deck {
  constructor(arrOfCards) {
    this.cards = arrOfCards;
    this.shuffle = this.shuffle.bind(this);
    this.draw = this.draw.bind(this);
  }

  shuffle() {
    for (let i = 0; i < this.cards.length; i += 1) {
      const temp = this.cards[i];
      const randomIndex = Math.floor(Math.random() * (this.cards.length));
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }

  draw() {
    return this.cards.pop();
  }
}

module.exports = Deck;
