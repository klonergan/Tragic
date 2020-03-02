/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Card from './card.jsx';

export default function Hand(props) {
  return (
    <div>
      {props.hand.map((card) => <Card card={card} />)}
    </div>
  );
}
