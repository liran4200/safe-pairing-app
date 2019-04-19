import React from 'react';
import {Link} from 'react-router-dom'
import {registerUser} from '../../UserAPI';
import { MDBContainer,MDBCardHeader,MDBIcon,MDBModalFooter, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       fname: "",
       lname: "",
       email: "",
       confirmEmail: "",
       password: ""
    };

  }

  submitHandler = (event) => {
    event.preventDefault();
    this.register()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  register = async () => {
    const user = {
      firstName: this.state.fname,
      lastName: this.state.lname,
      email: this.state.email,
      password: this.state.password
    }

    const response = await registerUser(user);
    console.log(response);
  }

  render() {
    return (
      <MDBContainer>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="5">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Sign Up:
                  </h3>
                </MDBCardHeader>
                <form
                  className="needs-validation"
                  onSubmit={this.submitHandler}
                  noValidate
                >
                  <div className="grey-text">
                    <MDBInput
                      name="fname"
                      label="First name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      name="lname"
                      label="Last name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      name="email"
                      label="Your email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      name="confirmEmail"
                      label="Confirm your email"
                      icon="exclamation-triangle"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      name="password"
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit">
                      Sign Up
                    </MDBBtn>
                  </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>Already have an account? <Link to="sign-in">Sign In</Link></p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
    </MDBContainer>
    );
  }
}

export default SignUp;