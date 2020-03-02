/* eslint-disable no-lonely-if */
const phaseList = ['upkeep', 'draw', 'main', 'attack', 'block', 'damage', 'end'];
class GameState {
  constructor(p1Deck, p2Deck) {
    this.stack = [];
    this.turn = 0;
    this.phaseIndex = 2;
    this.phase = phaseList[this.phaseIndex];
    this.priority = true;

    this.p1Field = [];
    this.p2Field = [];
    this.p1Hand = [];
    this.p2Hand = [];
    this.p1Deck = p1Deck;
    this.p2Deck = p2Deck;
    this.p1Resource = 0;
    this.p2Resource = 0;
    // avail is available resources
    this.p1Avail = 0;
    this.p2Avail = 0;

    this.p1Pass = false;
    this.p2Pass = false;

    this.p1Life = 20;
    this.p2Life = 20;

    this.private = this.private.bind(this);
    this.step = this.step.bind(this);
    this.pass = this.pass.bind(this);
  }

  private(player) {
    if (player === 1) {
      return {
        player: 1,
        yourField: this.p1Field,
        oppField: this.p2Field,
        stack: this.stack,
        hand: this.p1Hand,
        oppHandSize: this.p2Hand.length,
        yourDeckCount: this.p1Deck.length,
        oppDeckCount: this.p2Deck.length,
        yourResource: this.p1Resource,
        oppResource: this.p2Resource,
        turn: this.turn,
        phase: this.phase,
        priority: this.priority,
        yourLife: this.p1Life,
        oppLife: this.p2Life,
        yourAvail: this.p1Avail,
        oppAvail: this.p2Avail,
      };
    }
    return {
      player: 2,
      yourField: this.p2Field,
      oppField: this.p1Field,
      stack: this.stack,
      hand: this.p2Hand,
      oppHandSize: this.p1Hand.length,
      yourDeckCount: this.p2Deck.length,
      oppDeckCount: this.p1Deck.length,
      yourResource: this.p2Resource,
      oppResource: this.p1Resource,
      turn: this.turn,
      phase: this.phase,
      priority: !this.priority,
      yourLife: this.p2Life,
      oppLife: this.p1Life,
      yourAvail: this.p2Avail,
      oppAvail: this.p1Avail,
    };
  }

  step() {
    if (this.stack.length !== 0) {
      const card = this.stack.pop();
      if (card.type === 'being') {
        if (card.owner === 1) {
          this.p1Field.push(card);
        } else {
          this.p2Field.push(card);
        }
      }
    } else {
    // if stack is empty, go to next phase. if at last phase, go to next turn
      if (this.phaseIndex < phaseList.length - 1) {
        this.phaseIndex += 1;
        this.phase = phaseList[this.phaseIndex];
        // if next phase is draw, that player draws
        if (this.phase === 'draw' && this.turn % 2 === 0) {
          const card = this.p1Deck.pop();
          this.p1Hand.push(card);
        } else if (this.phase === 'draw' && this.turn % 2 === 1) {
          const card = this.p2Deck.pop();
          this.p2Hand.push(card);
        }
      } else {
        this.turn += 1;
        this.phaseIndex = 0;
        this.phase = phaseList[this.phaseIndex];
        // heal all beings when turn is passed and reset resources for new player
        for (let i = 0; i < this.p1Field.length; i += 1) {
          if (this.p1Field[i].type === 'being') {
            this.p1Field[i].hp = this.p1Field.d;
          }
        }
        for (let i = 0; i < this.p2Field.length; i += 1) {
          if (this.p2Field[i].type === 'being') {
            this.p2Field[i].hp = this.p2Field.d;
          }
        }
        if (this.turn % 2 === 0) {
          this.p1Avail = this.p1Resource;
        } else {
          this.p2Avail = this.p2Resource;
        }
      }
    }
    this.p1Pass = false;
    this.p2Pass = false;
    if (this.turn % 2 === 0) {
      this.priority = true;
    } else {
      this.priority = false;
    }
  }

  pass(player) {
    if (player === 1) {
      this.p1Pass = true;
    }
    if (player === 2) {
      this.p2Pass = true;
    }
    if (this.p1Pass && this.p2Pass) {
      this.step();
    }
  }

  play(player, i) {
    let card = {};
    if (player === 1) {
      card = this.p1Hand.splice(i, 1);
      this.priority = true;
      // if the card is a resource add to their pool
      if (card.type === 'resource') {
        this.p1Resource += 1;
        this.p1Avail += 1;
        return;
      }
    } else {
      card = this.p2Hand.splice(i, 1);
      this.priority = false;
      if (card.type === 'resource') {
        this.p2Resource += 1;
        this.p2Avail += 1;
        return;
      }
    }
    this.p1Pass = false;
    this.p2Pass = false;
    this.stack.push(card);
  }
}

module.exports = GameState;
