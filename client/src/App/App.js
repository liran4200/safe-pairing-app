import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashBoard from '../pages/Dashboard';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage/HomePage';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import Background from '../images/background_image.jpg';

let backgroundHome = {
  height: "1000px",
  backgroundRepeat  : 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  overflow: 'hidden',
  backgroundImage: `url(${Background})`
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn')? true : false
    };
  }

  onLoggedIn = () => {
      localStorage.setItem('isLoggedIn', true);
      this.setState({isLoggedIn: true});
  }

  componentDidMount(){
      this.setState({
        isLoggedIn: localStorage.getItem('isLoggedIn')? true : false
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderBar isLoggedIn={this.state.isLoggedIn}></HeaderBar>
        </div>
        <div  style={backgroundHome}> 
          <Route exact path="/"  component={HomePage}></Route>
          <Route path="/sign-up"  component={SignUpPage}></Route>
          <Route path="/sign-in"  render={(routeProps) => ( <SignInPage {...routeProps} onLoggedIn={this.onLoggedIn}/>)}
          />
          <Route path="/dashboard"  component={DashBoard}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
