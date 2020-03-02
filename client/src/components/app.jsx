/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import io from 'socket.io-client';
import Hand from './hand.jsx';


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
  }

  componentDidMount() {
    this.state.socket = io.connect('/');
    this.state.socket.on('state', (data) => {
      console.log(data);
      this.setState({ gameState: data });
    });
  }

  render() {
    return (
      <div>
        <Hand hand={this.state.gameState.hand} />
        {JSON.stringify(this.state.gameState)}
      </div>
    );
  }
}
