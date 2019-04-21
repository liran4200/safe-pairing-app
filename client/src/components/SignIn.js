import React from 'react';
import {Link} from 'react-router-dom'
import {login} from '../serverCalls/LoginAPI';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    };

  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    console.log(this.state);
    login({
      email: this.state.email,
      password: this.state.password
    });

  }

  render(){
      return (
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Sign In:
                  </h3>
                </MDBCardHeader>
                <form
                  className="needs-validation"
                  onSubmit={this.submitHandler}
                  noValidate
                >
                  <div className="grey-text">
                    <MDBInput
                      name="email"
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      name="password"
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="valid-feedback">Looks good!</div>
                <div className="text-center mt-4">
                  <MDBBtn
                    color="light-blue"
                    className="mb-3"
                    type="submit"
                  >
                    Sign In
                  </MDBBtn>
                </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>Not a member? <Link to="sign-up">Sign Up</Link></p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      );
    }
}

export default SignIn;
