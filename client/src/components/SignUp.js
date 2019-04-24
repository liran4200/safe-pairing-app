import React from 'react';
import {Link} from 'react-router-dom'
import {registerUser, confirmUser} from '../serverCalls/UsersAPI';
import ConfirmEmailModal from './ConfirmEmailModal/ConfirmEmailModal';
import {MDBCardHeader,MDBIcon,MDBModalFooter, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       fname: "",
       lname: "",
       email: "",
       confirmEmail: "",
       password: "",
       isOpen: false,
       submitText: "Sign Up",
       userId: ""
    };

  }

  submitHandler = async (event) => {
    event.preventDefault();
    const res = await this.register();
    console.log(res)
    this.setState({
      isOpen: !this.state.isOpen,
      submitText: "Confirm",
      userId: res._id
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleConfirmationModal = async (code) => {
    console.log(code);
    await confirmUser(this.state.userId,code);
  }

  handleClose = () => {
    this.setState({
      isOpen: !this.state.isOpen
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
    return response;
  }

  render() {
    return (
      <div>
        <ConfirmEmailModal
            isOpen={this.state.isOpen}
            handleClose={this.handleClose}
            handleConfirm={this.handleConfirmationModal}
        >
        </ConfirmEmailModal>
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
                      <MDBBtn size="lg" color="primary" type="submit">
                        {this.state.submitText}
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
    </div>
    );
  }
}

export default SignUp;
