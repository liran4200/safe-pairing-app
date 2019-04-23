import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DashBoard from '../pages/Dashboard';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage/HomePage';
import HeaderBar from '../components/HeaderBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <HeaderBar></HeaderBar>
        </div>
        <div> 
          <Route exact path="/"  component={HomePage}></Route>
          <Route path="/sign-up"  component={SignUpPage}></Route>
          <Route path="/sign-in"  component={SignInPage}></Route>
          <Route path="/dashboard"  component={DashBoard}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
