import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import DashBoard from './pages/Dashboard';

class App extends Component {
  render() {
    return (
      <Router >
        <div className="App">
        </div>
        <div>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/dashboard" component={DashBoard}/>
        </div>
      </Router>
    );
  }
}

export default App;
