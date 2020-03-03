/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';
import Card from './card.jsx';

const HandWrapper = styled.div`
  height: 30%;
  justify-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-items: space-between;
  flex-wrap: wrap;
`;

export default function Hand(props) {
  return (
    <HandWrapper>
      {props.hand.map((card, i) => <Card card={card} i={i} play={props.play} key={`h${i}`} />)}
    </HandWrapper>
  );
}
