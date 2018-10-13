//const UserData = require('./UserData');
const UUID = require('node-uuid');


const Games = {};
const MAXPLAYERS = 2;
class Game{
  constructor(gameUUId, roomName){
    this.roomName = roomName;
    this.gameUUId = gameUUId;
    this.players = [];    // 対戦車
    this.audience = [];   // 観戦者
    this.turnPlayer = 1;  // 次のターンのプレイヤー番号
    this.stepNumber = 0;  // ターン数
    this.board = [
      [2,2,2,2,2],
      [0,0,0,0,0],
      [0,0,3,0,0],
      [0,0,0,0,0],
      [1,1,1,1,1],
    ];
  }
  addPlayer(socket, user){
    const userUUID = user.userUUID;
    const isJOINED = this.players.filter(v=>v.userUUID === userUUID).length>0
      || this.audience.filter(v=>v.userUUID === userUUID).length>0;
    if(isJOINED){
      return;
    }else if(this.players.length < MAXPLAYERS){
      this.players.push(user);
      socket.join(this.gameUUId);
      user.setGame(this.gameUUId);
    }else{
      this.audience.push(user);
      socket.join(this.gameUUId);
    }
  }
  notifyAll(socket){
    socket.to(this.gameUUId).emit('showNowGame', this);
  }
};

exports.createNewGame = (roomName)=>{
  const gameUUID = UUID.v4();
  Games[gameUUID] = new Game(gameUUID, roomName);
  return Games[gameUUID];
};
exports.getGame = (gameUUID) => {
  return Games[gameUUID];
};
exports.getGameList = () => {
  return Object.keys(Games).map(key=>{return Games[key];});
};
exports.disconnectSocket = (socketid)=>{

}
