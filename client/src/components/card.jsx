/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

const OutterWrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  border: 5px solid black;
  border-radius: 10px;
`;

const TitleLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TypeLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const RulesBox = styled.div`
  align-self: center;
  display: flex;
  height: 75px;
  width 175px;
  border: 1px solid black;
  align-content: center;
  justify-content: center;
`;

const AD = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ImgWrapper = styled.div`
  align-self: center;
  height:100px;
  width:175px;
`;

const CardImg = styled.img`
  height: 100px;
  width 175px;
  object-fit: cover;
`;

export default function Card(props) {
  if (props.card.type === 'resource') {
    return (
      <OutterWrapper onClick={() => { props.play(props.i); }}>
        {props.card.name}
        <ImgWrapper>
          <CardImg src={props.card.image} alt="" />
        </ImgWrapper>
        <TypeLine>
          {props.card.type}
        </TypeLine>
        <RulesBox>{props.card.rulesText}</RulesBox>
        <AD>{' '}</AD>
      </OutterWrapper>
    );
  }
  if (props.card.type === 'being') {
    return (
      <OutterWrapper onClick={() => { props.play(props.i); }}>
        <TitleLine>
          <span>{props.card.name}</span>
          <span>{props.card.cost}</span>
        </TitleLine>
        <ImgWrapper>
          <CardImg src={props.card.image} alt="" />
        </ImgWrapper>
        <TypeLine>
          {props.card.type}
        </TypeLine>
        <RulesBox>{props.card.rulesText}</RulesBox>
        <AD>{`${props.card.a}/${props.card.d}`}</AD>
      </OutterWrapper>
    );
  }
  return null;
}
