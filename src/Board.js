import React, { Component } from 'react';
import Piece from './Piece';

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstClick: "",
      secondClick:""
    }
    this.click = this.click.bind(this);
  }

  renderSquare(value, i, boardPoint) {
    switch (value) {
      case 1:
        return <button key={i} value={value} data-point={boardPoint} onClick={this.click} className="square">{Piece('cat')}</button>
      case 2:
        return <button key={i} value={value} data-point={boardPoint} onClick={this.click} className="square">{Piece('dog')}</button>
      case 3:
        return <button key={i} value={value} data-point={boardPoint} onClick={this.click} className="square">{Piece('hole')}</button>
      default:
        return <button key={i} value={value} data-point={boardPoint} onClick={this.click} className="square">{Piece('')}</button>
    }
  }

  click(event) {
    // 移動させるコマの座標値
    let pieceData = event.currentTarget.getAttribute('data-point');
    // TODO　サーバーに移動先と移動元の座標を送る
    if(this.state.firstClick == "") {
      this.setState({
        firstClick:pieceData
      });
      console.log("firstClick",pieceData);
    }
    else if(this.state.firstClick && this.state.secondClick == "") {
      console.log("secondClick",pieceData);
      this.setState({
        secondClick:pieceData
      });
    }
    else{
      this.setState({
        firstClick:"",
        secondClick:""
      });
    }
  }

  createBorad(){
    const prop_board = this.props.board;
    const board = [];
    for(let i=0;i<prop_board.length;i++){
      board.push(
        <div className="board-row" key={"board"+i}>{
          prop_board[i].map((value, j)=>{
            return this.renderSquare(value, i*5 + j, [i,j]);
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
