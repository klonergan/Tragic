/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import Card from './card.jsx';

const StackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 750px;
  border: 2px solid green;
`;

export default function Stack(props) {
  return (
    <StackWrapper>
      <p>The Stack</p>
      {props.stack.map((card) => <Card card={card} />)}
    </StackWrapper>
  );
}
