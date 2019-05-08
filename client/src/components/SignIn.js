import React from 'react';
import {Link, Redirect} from 'react-router-dom'
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
        password: '',
        shouldRedirect: false
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

  submitHandler = async (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    const token = await login({
      email: this.state.email,
      password: this.state.password
    });
     this.setState({
       shouldRedirect: true
     });
     localStorage.setItem('token',token);
     this.props.onLoggedIn();
    }

  render(){
    if(this.state.shouldRedirect)
        return <Redirect to="/dashboard"/>
    else
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
                    size="lg"                  
                    color="primary"
                    className="mb-3 btn-primary"
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
