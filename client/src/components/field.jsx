import React from 'react';
import styled from 'styled-components';
import Card from './card.jsx';


const Wrapper = styled.div`
  height: 50%;
  border: 2px solid red;
  display: flex;
  flex-direction: row;
`;

export default function Field(props) {
  return (
    <Wrapper>
      <p>{`${props.owner} field`}</p>
      { props.field.map((card, i) => <Card card={card} i={i} play={() => { props.play('attack', i); }} />) }
    </Wrapper>
  );
}
