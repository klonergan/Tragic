import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 750px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const InfoBox = styled.div`
  height: 35%;
  border: 5px solid black;
`;

export default function InfoBar(props) {
  return (
    <Wrapper>
      <InfoBox>
        <p>
          {`Opp's Life: ${props.state.oppLife}`}
        </p>
        <p>
          {`Opp's Hand Size: ${props.state.oppHandSize}`}
        </p>
        <p>
          {`Opp's Deck Count: ${props.state.oppDeckCount}`}
        </p>
        <p>
          {`Opp's Avail Res: ${props.state.oppAvail}`}
        </p>
      </InfoBox>
      <InfoBox>
        <p>
          {`Your Life: ${props.state.yourLife}`}
        </p>
        <p>
          {`Your Deck Count: ${props.state.yourDeckCount}`}
        </p>
        <p>
          {`Your Avail Res: ${props.state.yourAvail}`}
        </p>
      </InfoBox>
    </Wrapper>
  );
}