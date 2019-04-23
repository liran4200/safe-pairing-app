import React, { Component } from "react";
import './HeaderBar.css'
import {
MDBNavbar, MDBNavbarBrand 
} from "mdbreact";

class HomePage extends Component {
    
render() {
  return (
        <MDBNavbar color="indigo" dark expand="md">
            <MDBNavbarBrand className="navbar-brand mx-auto">
            <strong className="white-text">Safe Pairing App</strong>
            </MDBNavbarBrand>
        </MDBNavbar>
     );
  }
}

export default HomePage;