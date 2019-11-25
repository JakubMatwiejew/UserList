import React from 'react';
import './App.css';
import Users from './Users/Users';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Posts from './Posts/Posts';
import Nav from './Nav/Nav';
import Home from './Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Home exact path="/"/>
          <Route path="/users" component={Users}/>
          <Route path="/posts" component={Posts}/>
        </Switch>
      </div>
    </Router>
  );
}

//TODO: endpoints in one file

export default App;
