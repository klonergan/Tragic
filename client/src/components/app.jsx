/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Hand from './hand.jsx';
import InfoBar from './infoBar.jsx';

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justy-content: space-between;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  height: 100%;
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
    };

    // socket.emit('event', 'data');
    this.play = this.play.bind(this);
    this.pass = this.pass.bind(this);
  }


  componentDidMount() {
    // set up socket on component mount
    this.state.socket = io.connect('/');
    this.state.socket.on('state', (data) => {
      this.setState({ gameState: data });
      console.log(data);
    });
  }


  play(index) {
    this.state.socket.emit('play', JSON.stringify(index));
  }

  pass() {
    this.state.socket.emit('pass');
  }

  render() {
    return (
      <OuterWrapper>
        <InfoWrapper>
          <InfoBar state={this.state.gameState} />
        </InfoWrapper>
        <Hand hand={this.state.gameState.hand} play={this.play} />
        {JSON.stringify(this.state.gameState)}
      </OuterWrapper>
    );
  }
}
