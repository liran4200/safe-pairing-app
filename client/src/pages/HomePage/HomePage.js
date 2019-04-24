import React from "react";
import './HomePage.css';
import {Redirect} from 'react-router-dom';
import Background from '../../images/background_image.jpg';
import { MDBRow,
  MDBCol, MDBIcon,
  MDBBtn, MDBContainer} from 'mdbreact';

let backgroundHome = {
    height: "1000px",
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    overflow: 'hidden',
    backgroundImage: `url(${Background})`
};


class HomePage extends React.Component{ 

   constructor(props) {
     super(props);
     this.state = {
       shouldRediret: false,
       to: ""
     }  

   }


    handleClick = (to) => {
      console.log(this.props);
      this.props.history.push(to);
    }

   render(){
      if(this.state.shouldRedirect){
        return <Redirect to={`/${this.state.to}`}/>
      }
      else
      {
      return(
        <div style={backgroundHome}>
        <MDBContainer className="px-md-3 px-sm-0">
          <MDBRow>
          <MDBCol md="12" className="mb-4 white-text text-center">
              <h3 className="display-3 font-weight-bold mb-0 pt-md-5">
                Safe Pairing
              </h3>
              <hr className="hr-light my-4 w-75" />
              <h4 className="subtext-header mt-2 mb-4">
              </h4>
              <MDBBtn 
                size="lg"
                outline rounded color="white" 
                onClick={() => {this.handleClick('/sign-in')}}>
                <MDBIcon icon="sign-in-alt" /> Sign In
              </MDBBtn>
              <MDBBtn 
                size="lg"
                outline rounded color="white" 
                onClick={() => {this.handleClick('/sign-up')}}> 
                <MDBIcon icon="user-plus" />  
                Sign Up
              </MDBBtn>
          </MDBCol>
          </MDBRow>
      </MDBContainer>
      </div> 
      );
    }
  }

}

  export default HomePage;