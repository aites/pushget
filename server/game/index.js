const UserData = require('./userData');
const GameBoard = require('./GameBoard');

const games = {};

module.exports = (server, app)=>{
  const io = require('socket.io').listen(server);
  const ns_game = io.of('/game');
  const ns_room = io.of('/room');

  //セッションをsocket上で使えるように
  io.use((socket, next)=>{
    app.session(socket.request, socket.request.res, next);
  });

  //接続確立時の処理
  ns_game.on('connection', (socket)=>{
    // この中でデータのやり取りを行う
    socket.on('setUser', (data)=>{
      socket.emit('sendUser', UserData.getUser(data.userUUID));
    });
    socket.on('showGame', (data)=>{
      const gameUUId = data.gameUUId;
      socket.emit('showNowGame', games[gameUUId]);
    });
    socket.on('joinGame', (data)=>{
      const game = GameBoard.getGame(data.gameUUId);
      if(!game) return;
      const user = UserData.setUser(data.userUUID, socket.id);
      game.addPlayer(socket, user);
      game.notifyAll(socket);
      socket.emit('showNowGame', game);
    });
    socket.on('disconnect', ()=>{
      console.log('切断しました。', socket.id, Object.keys(socket.adapter.rooms));
      GameBoard.disconnectSocket(socket.id);
    });
    socket.on('connect', (data)=>{
      console.log('接続しました。', socket.id);
    });

  });

  ns_room.on('connection', (socket)=>{
    /** room **/
    socket.on('getPageData', (data)=>{
      socket.emit('showRoomList', GameBoard.getGameList());
      socket.emit('showUserList', UserData.getRoomUserList());
    });
    socket.on('createRoom', (data)=>{
      const userUUID = data.userUUID;
      const roomName = data.roomName;
      const playerName = data.playerName;
      if(!roomName){
        socket.emit('showErrorDialog', {message: '部屋名を入力してください'});
      }else if(!playerName){
        socket.emit('showErrorDialog', {message: 'プレイヤー名を入力してください'});
      }else{
        const game = GameBoard.createNewGame(roomName);
        socket.emit('createedRoom', game);
      }
    });
  });
};

function getRoomList(){
  return Object.keys(games).map(key=>{
    return games[key];
  });
}
