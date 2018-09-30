import React from 'react';
import Piece from './Piece';

function Square(props) {
  switch (props.value) {
    case 1:
      return <button className="square">{Piece('cat')}</button>
    case 2:
      return <button className="square">{Piece('dog')}</button>
    default:
      return <button className="square">{Piece('')}</button>
    break;
  }
}

export default Square;
