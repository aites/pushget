import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }


  createBorad(){
    let board = [];
    for(let i=0;i<5;i++){
      board.push(
        <div className="board-row" key={"board"+i}>{
        [0,1,2,3,4].map(j=>{
          return this.renderSquare(i*5 + j);
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