import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Board from './Board';
import io from "socket.io-client";
import UUID from "node-uuid";
import Cookies from 'js-cookie';

import * as local_config from './config/config.local.json';

class Room extends Component {
  constructor() {
    super();
    const userUUID = Cookies.get("userUUID")?Cookies.get("userUUID"):UUID.v4();
    Cookies.set("userUUID", userUUID);

    const socket = io(local_config.localIpAddress + `:3001/room`);

    socket.on('connect', ()=>{
      socket.emit('setUser', {userUUID});
      socket.emit('getPageData', {userUUID});
    });
    socket.on('showRoomList', (roomList)=>{
      if(this.mount)this.setState({roomList});
    });
    socket.on('showUserList', (userList)=>{
      if(this.mount)this.setState({userList});
    });
    socket.on('createedRoom', (gameData)=>{
      this.props.history.push('/game?gameUUId=' + gameData.gameUUId);

    });
    socket.on('showErrorDialog', (message)=>{
      alert(message.message);
    });

    this.state = {
      roomList: [],
      userList: [],
    };

    this.changeText = (e)=>{
      if(this.mount)switch(e.target.id){
        case "roomName":
          this.setState({roomNameInput: e.target.value});
          break;
        case "playerName":
          this.setState({playerNameInput: e.target.value});
          break;
      }
    };
    this.clickCreateRoom = ()=>{
      const roomName = this.state.roomNameInput;
      const playerName = this.state.playerNameInput;
      socket.emit('createRoom', {userUUID, roomName, playerName});
    };
    this.joinGame = (e)=>{
      const gameUUId = e.currentTarget.dataset.gameuuid;
      console.log('joined', gameUUId);
      this.props.history.push('/game?gameUUId=' + gameUUId);
    };
  }

  componentDidMount(){
    this.mount = true;
  }

  componentWillUnmount(){
    this.mount = false;
  }

  render() {
    const roomList = this.state.roomList;
    const userList = this.state.userList;
    return (
      <div className="roomList">
        <a> room </a>
        <div>
          <h1>部屋を作る</h1>
          <input id="roomName" type="text" placeholder="部屋名" onChange={this.changeText} />
          <input id="playerName" type="text" placeholder="プレイヤー名" onChange={this.changeText} />
          <input type="button" value="作成" onClick={this.clickCreateRoom}/>
        </div>
        <ul>{
          roomList.map(data=>{
            return (
              <li key={data.gameUUId} data-gameuuid={data.gameUUId} onClick={this.joinGame} >
                <a>{data.roomName}</a>
                <a>{data.gameUUId}</a>
              </li>
            );
          })
        }</ul>
        <h1>接続者</h1>
        <ul>{
          userList.map(data=>{
            return (
              <li key={data.userUUID} data-useruuid={data.userUUID} >
                <a>{data.userName}</a>
                <a>{data.userUUID}</a>
              </li>
            );
          })
        }</ul>
      </div>
    );
  }
}

export default withRouter(Room);
