import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './compoents/pages/login'
import Signup from './compoents/pages/signup'
import HomePage from './compoents/pages/homepage'

import 'style.css'

const App = () => {
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/homepage" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
};

export default App;
