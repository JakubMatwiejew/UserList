import React from 'react';
import './App.css';
import Users from './Users/Users';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Posts from './Posts/Posts';

function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <Switch>
          <Route path="/users" component={Users}/>
          <Route path="/posts" component={Posts}/>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>What do you want to fetch?</h1>
    <div className="nav-buttons">
      <Link to="/users">
        <button style={{marginRight: "30px"}} className="button nav-button">Users</button>
      </Link>
      <Link to="posts">
        <button className="button nav-button">Posts</button>
      </Link>
    </div>
  </div>
)

//TODO: endpoints in one file

export default App;
