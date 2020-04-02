import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './component/Header';
import Dashboard from './component/Dashbroad';
import MapPage from './component/Map/index'

function App() {
  return (
    <div className='container'>

      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route path='/map' exact component={MapPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
