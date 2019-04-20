import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DashBoard from './pages/Dashboard';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

class App extends Component {
  render() {
    return (
      <Router >
        <div className="App">
        </div>
        <div>
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/dashboard" component={DashBoard}/>
        </div>
      </Router>
    );
  }
}

export default App;
