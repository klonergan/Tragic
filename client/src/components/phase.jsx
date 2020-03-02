import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid blue;
`;

export default function Phase(props) {
  return (
    <Wrapper>
      <p>
        {`${(props.state.turn % 2) + 1 === props.state.player ? 'Your' : "Opponent's"} ${props.state.phase}`}
      </p>
      {props.state.priority ? <button type="button" onClick={props.pass}>OK</button> : null}
    </Wrapper>
  );
}
