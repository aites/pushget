import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Board from './Board';
import queryString from 'query-string';
import io from "socket.io-client";
import UUID from "node-uuid";
import Cookies from 'js-cookie';

class Game extends Component {
  constructor(props) {
    super();
    const userUUID = this.userUUID = Cookies.get("userUUID")?Cookies.get("userUUID"):UUID.v4();
    const socket = this.socket = io('192.168.1.2:3001/game');
    socket.on('connect', ()=>{
      socket.emit('joinGame', {gameUUId, userUUID});
    });
    socket.on('sendUser', (info)=>{
      alert(info);
    });
    socket.on('sendMove', (info)=>{
    });
    socket.on('showNowGame', (gameData)=>{
      console.log("gameData", gameData);
      if(this.mount){
        if(gameData){
          this.setState(gameData);
        }else{
          this.props.history.push('/room');
        }
      }
    });
    socket.on('showErrorDialog', (message)=>{
      alert(message.message);
    });

    const gameUUId = props.gameUUId;
    this.state = {
      gameUUId: gameUUId,
      turnPlayer: 1,  // 次のターンのプレイヤー番号
      stepNumber: 0,  // ターン数
      board: [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ],
    };

    this.changeText = (e)=>{
      if(this.mount) this.setState({gameUUId: e.target.value});
    };
  }

  componentDidMount(){
    this.mount = true;
  }

  componentWillUnmount(){
    this.mount = false;
    this.socket.disconnect();
  }

  render() {
    const board = this.state.board;
    return (
      <div>
      <div className="game">
        <div className="game-board">
          <Board
            board={board}
          />
        </div>
      </div>
      <h1>{JSON.stringify(this.state)}</h1>
      </div>
    );
  }
}

export default Game;
