import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './component/Header';
import Dashboard from './component/Dashbroad';
import MapPage from './component/Map/index';
import UserPage from './component/User';
import ErrorRedirect from './component/ErrorRedirect';
import history from './component/History';

function App() {
  return (
    <div className='container'>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/maps' exact component={MapPage} />
          <Route path='/users' exact component={UserPage} />
          <Route path='/errorredirect' exact component={ErrorRedirect} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
