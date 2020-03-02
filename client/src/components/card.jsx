/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

export default function Card(props) {
  console.log(props.card);
  if (props.card.type === 'resource') {
    return (
      <span>
        {props.card.name}
        <img src={props.card.image} alt="" />
        {props.card.rulesText}
      </span>
    );
  }
  if (props.card.type === 'being') {
    return (
      <span>
        {props.card.name}
        <img src={props.card.image} alt="" />
        {props.card.rulesText}
      </span>
    );
  }
  return null;
}
