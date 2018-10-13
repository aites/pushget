import React from 'react';
import Piece from './Piece';

function Square(props) {

  function click(event) {
    // 移動させるコマの座標値
    let pieceData = event.currentTarget.getAttribute('data');
    // TODO　サーバーに移動先と移動元の座標を送る
  }

  switch (props.value) {
    case 1:
      return <button className="square" data={props.data} onClick={click}>{Piece('cat')}</button>
    case 2:
      return <button className="square" data={props.data} onClick={click}>{Piece('dog')}</button>
    case 3:
      return <button className="square" data={props.data} onClick={click}>{Piece('hole')}</button>
    default:
      return <button className="square" data={props.data} onClick={click}>{Piece('')}</button>
  }
}

export default Square;
