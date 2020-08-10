import React from 'react';
import './App.sass';
import {Route, Switch, Redirect} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import UserInfoPage from './pages/UserInfoPage/UserInfoPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <Switch>
              <Route exact path={'/'} component={HomePage}/>
              <Route path={'/user-info'} component={UserInfoPage}/>
              <Route path={'/404'} component={NotFoundPage}/>
              <Redirect to={'/404'} />
        </Switch>
    </div>
  );
}

export default App;
