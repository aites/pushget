import React from 'react';
import Piece from './Piece';
let pieceData;
let moveData;

function Square(props) {

  

  function click(event) {
    // event.preventDefault();
    pieceData = event.currentTarget.getAttribute('data');
    console.log(pieceData);
  }

  function move(event) {
    moveData = event.currentTarget.getAttribute('data');
    if(pieceData){
      console.log(moveData);
    }
  }

  switch (props.value) {
    case 1:
      return <button className="square" data={props.data} onClick={click}>{Piece('cat')}</button>
    case 2:
      return <button className="square" data={props.data}>{Piece('dog')}</button>
    case 3:
      return <button className="square" data={props.data}>{Piece('hole')}</button>
    default:
      return <button className="square" data={props.data} onClick={move}>{Piece('')}</button>
    break;
  }
}

export default Square;
