import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import history from './utils/history';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path='/' exact />
          <Route path='/profile' component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
