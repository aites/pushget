import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(value, i) {
    return <Square key={i} value={value}/>;
  }

  createBorad(){
    const prop_board = this.props.board;
    const board = [];
    for(let i=0;i<prop_board.length;i++){
      board.push(
        <div className="board-row" key={"board"+i}>{
          prop_board[i].map((value, j)=>{
            return this.renderSquare(value, i*5 + j);
        })}
      </div>);
    }
    return board;
  }

  render() {
    return (this.createBorad());
  }
}

export default Board;
