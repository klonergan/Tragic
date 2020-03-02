class GameState {
  constructor(p1Deck, p2Deck) {
    this.stack = [];
    this.p1Field = [];
    this.p2Field = [];
    this.p1Hand = [];
    this.p2Hand = [];
    this.p1Deck = p1Deck;
    this.p2Deck = p2Deck;
    this.p1Resource = 0;
    this.p2Resource = 0;
  }
}

module.exports = { GameState };
