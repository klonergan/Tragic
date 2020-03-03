/* eslint-disable no-lonely-if */
const phaseList = ['upkeep', 'draw', 'main', 'attack', 'block', 'damage', 'end'];
class GameState {
  constructor(p1Deck, p2Deck) {
    this.stack = [];
    this.turn = 0;
    this.phaseIndex = 2;
    this.phase = phaseList[this.phaseIndex];
    this.priority = true;
    // victory will be represented with winning player's number
    this.victory = 0;
    this.attacking = [];
    this.blocking = [];

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
    this.play = this.play.bind(this);
    this.checkState = this.checkState.bind(this);
    this.attack = this.attack.bind(this);
    this.block = this.block.bind(this);
    this.damage = this.damage.bind(this);
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
        victory: this.victory,
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
      victory: this.victory,
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
        } else if (this.phase === 'damage') {
          this.damage();
        } else if (this.phase === 'block') {
          this.priority = !(this.turn % 2 === 0);
        }
      // going to next turn
      } else {
        this.turn += 1;
        this.phaseIndex = 0;
        this.phase = phaseList[this.phaseIndex];
        // heal all beings when turn is passed and reset resources for new player
        for (let i = 0; i < this.p1Field.length; i += 1) {
          if (this.p1Field[i].type === 'being') {
            this.p1Field[i].hp = this.p1Field[i].d;
            if (this.turn % 2 === 0) {
              this.p1Field[i].act = false;
            }
          }
        }
        for (let i = 0; i < this.p2Field.length; i += 1) {
          if (this.p2Field[i].type === 'being') {
            this.p2Field[i].hp = this.p2Field[i].d;
            if (this.turn % 2 === 1) {
              this.p2Field[i].act = false;
            }
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
    if (this.turn % 2 === 0 && this.phase !== 'block') {
      this.priority = true;
    } else if (this.turn % 2 === 1 && this.phase !== 'block') {
      this.priority = false;
    }
  }

  pass(player) {
    if (player === 1 && this.priority) {
      this.p1Pass = true;
      this.priority = !this.priority;
    }
    if (player === 2 && !this.priority) {
      this.p2Pass = true;
      this.priority = !this.priority;
    }
    if (this.p1Pass && this.p2Pass) {
      this.step();
    }
  }

  play(player, i, target) {
    let card = {};
    if (player === 1 && this.priority) {
      if (this.p1Hand[i].cost > this.p1Avail || (this.p1Hand[i].type === 'resource' && (this.turn % 2 !== 0 || this.phase !== 'main'))) {
        return;
      }
      // eslint-disable-next-line prefer-destructuring
      card = this.p1Hand.splice(i, 1)[0];
      // if the card is a resource add to their pool
      if (card.type === 'resource' && this.turn % 2 === 0 && this.phase === 'main') {
        this.p1Resource += 1;
        this.p1Avail += 1;
        return;
      }
      this.p1Avail -= card.cost;
    } else if (player === 2 && !this.priority) {
      // don't allow cards with cost more than available resource to be played
      // don't allow resource plays outside main phase
      if (this.p2Hand[i].cost > this.p2Avail || (this.p2Hand[i].type === 'resource' && (this.turn % 2 !== 1 || this.phase !== 'main'))) {
        return;
        // don't allow land plays outside of own main phase
      }
      // eslint-disable-next-line prefer-destructuring
      card = this.p2Hand.splice(i, 1)[0];
      if (card.type === 'resource') {
        this.p2Resource += 1;
        this.p2Avail += 1;
        return;
      }
      this.p2Avail -= card.cost;
    }
    if (card === {}) {
      return;
    }
    this.p1Pass = false;
    this.p2Pass = false;
    this.stack.push(card);
  }

  checkState() {
    console.log('CheckState: ', this.p1Field, this.p2Field)
    for (let i = 0; i < this.p1Field.length; i += 1) {
      if (this.p1Field[i].type === 'being' && this.p1Field[i].hp <= 0) {
        this.p1Field.splice(i, 1);
        i -= 1;
      }
    }
    for (let i = 0; i < this.p2Field.length; i += 1) {
      if (this.p2Field[i].type === 'being' && this.p2Field[i].hp <= 0) {
        this.p2Field.splice(i, 1);
        i -= 1;
      }
    }
    if (this.p1Life <= 0) {
      this.victory = 2;
    } if (this.p2Life <= 0) {
      this.victory = 1;
    }
  }

  attack(player, arr) {
    if (player === 1 && this.turn % 2 === 0 && this.phase === 'attack') {
      this.attacking = arr;
      for (let i = 0; i < arr.length; i += 1) {
        if (!this.p1Field[arr[i]].act) {
          this.p1Field[arr[i]].act = true;
        }
      }
    } else if (player === 2 && this.turn % 2 === 1 && this.phase === 'attack') {
      this.attacking = arr;
      for (let i = 0; i < arr.length; i += 1) {
        if (!this.p2Field[arr[i]].act) {
          this.p2Field[arr[i]].act = true;
        }
      }
    }
  }

  block(player, arrOfTuples) {
    // in each tuple, first number is blocker index, second is attacker index
    // in their respective fields
    if (player === 1 && this.phase === 'block' && this.turn % 2 === 1) {
      this.blocking = arrOfTuples;
    } else if (player === 2 && this.phase === 'block' && this.turn % 2 === 0) {
      this.blocking = arrOfTuples;
    }
  }

  damage() {
    // keep track of which attackers dealt damage already
    const dealt = {};
    console.log('damage called');
    // p1 attacking p2 blocking
    if (this.turn % 2 === 0) {
      for (let i = 0; i < this.blocking.length; i += 1) {
        // blockers deal damage
        console.log('blocker deal damage');
        this.p1Field[this.blocking[i][1]].hp -= this.p2Field[this.blocking[i][0]].a;
        console.log(this.blocking[i][1]);
        if (dealt[this.blocking[i][1]] === undefined) {
          console.log('attacker deal damage');
          // if attacker hasn't dealt damage yet, it deals damage to this blocker
          dealt[this.blocking[i][1]] = true;
          this.p2Field[this.blocking[i][0]].hp -= this.p1Field[this.blocking[i][1]].a;
        }
      }
      for (let i = 0; i < this.attacking.length; i += 1) {
        if (!dealt[this.attacking[i]]) {
          this.p2Life -= this.p1Field[this.attacking[i]].a;
        }
      }

    // p2 attacking p1 blocking
    } else {
      for (let i = 0; i < this.blocking.length; i += 1) {
        // blockers deal damage
        console.log('blocker deal damage');
        this.p2Field[this.blocking[i][1]].hp -= this.p1Field[this.blocking[i][0]].a;
        console.log(this.blocking[i][1]);
        if (dealt[this.blocking[i][1]] === undefined) {
          console.log('attacker deal damage');
          dealt[this.blocking[i][1]] = true;
          this.p1Field[this.blocking[i][0]].hp -= this.p2Field[this.blocking[i][1]].a;
        }
      }
      for (let i = 0; i < this.attacking.length; i += 1) {
        if (!dealt[this.attacking[i]]) {
          this.p1Life -= this.p2Field[this.attacking[i]].a;
        }
      }
    }
    this.blocking = [];
    this.attacking = [];
    this.checkState();
  }
}

module.exports = GameState;
