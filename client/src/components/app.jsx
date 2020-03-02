/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Hand from './hand.jsx';
import Field from './field.jsx';
import Stack from './stack.jsx';
import InfoBar from './infoBar.jsx';


const OuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justy-content: space-between;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  height: 100%;
`;

const FieldHandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 750px;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: {
        player: 1,
        yourField: [],
        oppField: [],
        stack: [],
        hand: [],
        oppHandSize: 7,
        yourDeckCount: 33,
        oppDeckCount: 33,
        yourResource: 0,
        oppResource: 0,
        turn: 0,
        phase: 'main',
        priority: true,
        yourLife: 20,
        oppLife: 20,
        yourAvail: 0,
        oppAvail: 0,
      },
      socket: null,
      attackers: [],
      attackerObj: {},
    };

    // socket.emit('event', 'data');
    this.play = this.play.bind(this);
    this.pass = this.pass.bind(this);
    this.fieldPlay = this.fieldPlay.bind(this);
  }


  componentDidMount() {
    // set up socket on component mount
    this.state.socket = io.connect('/');
    this.state.socket.on('state', (data) => {
      this.setState({ gameState: data });
      console.log(data);
    });
  }

  // for playing from hand
  play(index) {
    this.state.socket.emit('play', JSON.stringify(index));
  }

  pass() {
    if (this.state.attackers.length !== 0) {

      // make sure to transmit numbers
      for (let i = 0; i < this.state.attackers.length; i += 1) {
        this.state.attackers[i] = Number(this.state.attackers[i]);
      }
      console.log(this.state.attackers);
      this.state.socket.emit('attack', this.state.attackers);
      this.state.attackers = [];
      this.state.attackerObj = {};
      return;
    }
    this.state.socket.emit('pass');
  }

  // for cards on your side of the field
  fieldPlay(action, i, j) {
    if (this.state.gameState.phase === 'attack') {
      this.state.attackerObj[i] = !this.state.attackerObj[i];
      this.state.attackers = Object.keys(this.state.attackerObj);
    }
  }

  render() {
    return (
      <OuterWrapper>
        <InfoWrapper>
          <InfoBar state={this.state.gameState} pass={this.pass} />
        </InfoWrapper>
        <FieldHandWrapper>
          <Field field={this.state.gameState.oppField} owner="Opponent's" />
          <Field field={this.state.gameState.yourField} owner="Your" play={this.fieldPlay} />
          <Hand hand={this.state.gameState.hand} play={this.play} />
        </FieldHandWrapper>
        <Stack stack={this.state.gameState.stack} />
        {/* JSON.stringify(this.state.gameState) */}
      </OuterWrapper>
    );
  }
}
