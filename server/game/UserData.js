const Users = {};
class User{
  constructor(userUUID, socketId){
    this._userUUID = userUUID; // userUUID
    this._socketId = socketId; // socketid
    this.gameUUId = null; // joined game instance
  }
  getUUID(){
    return this._userUUID;
  }
  setSocketId(socketId){
    this._socketId = socketId;
  }
  setGame(gameInstance){
    this._gameInstance = gameInstance;
  }
}

exports.setUser = (userUUID, socketId)=>{
  if(Users[userUUID]){
    Users[userUUID].setSocketId(socketId);
  }else{
    Users[userUUID] = new User(userUUID, socketId);
  }
  console.log({Users})
  return Users[userUUID];
};

exports.getUser = (userUUID) => {
  return Users[userUUID];
};

exports.getRoomUserList = () => {
  return Object.keys(Users).map(v=>{
    return Users[v];
  });
};

exports.joinGame = (userUUID, gameUUID)=>{
  console.log({userUUID, gameUUID,Users});
  Users[userUUID].gameUUId = gameUUID;
};
