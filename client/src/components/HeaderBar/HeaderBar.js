import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import {getCurrentUser} from '../../serverCalls/UsersAPI';
import './HeaderBar.css'
import {
MDBNavbar, MDBNavbarBrand,MDBBtn,MDBNavbarNav,MDBNavItem
} from "mdbreact";

class HeaderBar extends Component {

constructor(props) {
  super(props);
  this.state = {
    isLoggedIn: props.isLoggedIn,
    shouldRedirect: false,
    user: {
      id: "",
      fullName: ""
    }
  };
}

async componentDidMount() {
  console.log('in did mount ', this.state);
  if(this.state.isLoggedIn) {
      const user = await this.getUser();
      console.log(user);
      this.setState({
      user:{
        id: user._id,
        fullName: this.getFullName(user)
      }
    });
 }
}

getUser = async () => {
    return  await getCurrentUser(localStorage.getItem('token'));
}

getFullName = (user)  => {
    return user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)+" "+ 
    user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
}

async componentWillReceiveProps(nextProps) {
  console.log('will receive props: ', nextProps); 
  if(nextProps !== this.props ){
      let user = {};
      if(nextProps.isLoggedIn){
          user = await this.getUser(user);
          user = {
            id: user._id,
            fullName: this.getFullName(user)
          }
      }
      this.setState({
          isLoggedIn: nextProps.isLoggedIn,
          user
      });
  }
}

onLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isLoggedIn');
  this.setState({
    user:{
      id: "",
      fullName: "" 
    },
    isLoggedIn: false,
    shouldRedirect: true
  });  
  
} 

render() {
      if(this.state.shouldRedirect){
          this.setState({shouldRedirect: false});
          return <Redirect to="/"/>
      }
      else
        return (
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand className="navbar-brand mx-auto">
                  <strong className="white-text">Safe Pairing App</strong>
                </MDBNavbarBrand>
                  {this.state.isLoggedIn?
                (<MDBNavbarNav right>
                  <MDBNavItem>
                      <MDBNavbarBrand className="navbar-brand">
                          <strong className="white-text">{this.state.user.fullName}</strong>
                      </MDBNavbarBrand>
                  </MDBNavItem>
                  <MDBNavItem>
                      <div className="md-form my-0">
                      <MDBBtn size="sm" color="primary" type="submit" onClick={this.onLogout}>
                          Logout
                      </MDBBtn>
                      </div>                     
                  </MDBNavItem>
                </MDBNavbarNav>): null }
              </MDBNavbar>
        );
  }
}

export default HeaderBar;