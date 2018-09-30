import React from 'react';
import Piece from './Piece';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {Piece('dog')}
    </button>
  );
}

export default Square;