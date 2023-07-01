import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/pages/login';
import Signup from './components/pages/signup';
import HomePage from './components/pages/homepage';
import About from './components/pages/about';

import './stylesheets/style.css';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/homepage" component={HomePage} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
