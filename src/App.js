import React from 'react';
import logo from './logo.svg';
import Home from './components/Home';
import HomeAdmin from './components/HomeAdmin';
import Login from './components/Login';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
         <Route path="/homeAdmin" component={HomeAdmin}/>
         <Route path="/home" component={Home}/>
         <Route path="/" component={Login}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
