import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import Game from './Game';
import Room from './Room';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/game'>game</Link></li>
        <li><Link to='/room'>room</Link></li>
      </ul>
      <Switch>
        <Route exact path='/room' render={(props)=>{
          const userUUID = Cookies.get("userUUID")?Cookies.get("userUUID"):null;
          return <Room />;
        }}/>
        <Route exact path='/game' render={(props)=>{
          const userUUID = Cookies.get("userUUID")?Cookies.get("userUUID"):null;
          const queryValues = queryString.parse(props.location.search);
          if(!userUUID || !queryValues.gameUUId) return <Redirect to="/room" />;
          return <Game
            gameUUId={queryValues.gameUUId}
          />}
        }/>
      </Switch>
    </div>
  </BrowserRouter>
  ,document.getElementById('root')
);
