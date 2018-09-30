import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      turnPlayer: 1,  // 次のターンのプレイヤー番号
      stepNumber: 0,  // ターン数
      board: [
        [2,2,2,2,2],
        [0,0,0,0,0],
        [0,0,3,0,0],
        [0,0,0,0,0],
        [1,1,1,1,1],
      ],
    };
  }

  render() {
    const board = this.state.board;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            board={board}
          />
        </div>
      </div>
    );
  }
}

export default Game;
