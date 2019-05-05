import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import {registerUser, confirmUser} from '../../serverCalls/UsersAPI';
import './SignUp.css';
import ConfirmEmailModal from '../ConfirmEmailModal/ConfirmEmailModal';
import GenerateKeysModal from '../GenerateKeysModal/GenerateKeysModal';
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
       isOpenConfirm: false,
       isOpenGenerate: false,
       submitText: "Sign Up",
       userId: "",
       publicKey: "",
       shouldRedirect: false
    };

  }

  submitHandler = async (event) => {
    event.preventDefault();
    const res = await this.register();
    console.log(res)
    this.setState({
      isOpenConfirm: !this.state.isOpenConfirm,
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
    this.setState({
        shouldRedirect: !this.state.shouldRedirect,
        isOpenConfirm: false
    })
  }

  handleGenerateKeysModal = async (publicKey) => {
    this.setState({
      publicKey
    });
  }

  handleConfirmClose = () => {
        this.setState({
          isOpenConfirm: !this.state.isOpenConfirm
        });
  }

  handleGenerateClose = () => {
    this.setState({
      isOpenGenerate: !this.state.isOpenGenerate
    });
  }

  onClickGenerate = () => {
    this.setState({
      isOpenGenerate: !this.state.isOpenGenerate
    });
  }

  register = async () => {
    const user = {
      firstName: this.state.fname,
      lastName: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      publicKey: this.state.publicKey
    }

    const response = await registerUser(user);
    console.log(response);
    return response;
  }

  render() {
    if(this.state.shouldRedirect)
       return <Redirect to="/sign-in"/>
    else
      return (
        <div>
          <ConfirmEmailModal
              isOpen={this.state.isOpenConfirm}
              handleClose={this.handleConfirmClose}
              handleConfirm={this.handleConfirmationModal}
          >
          </ConfirmEmailModal>
          <GenerateKeysModal
              isOpen={this.state.isOpenGenerate}
              handleClose={this.handleGenerateClose}
              handleGenerate={this.handleGenerateKeysModal}
          >
          </GenerateKeysModal>
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
                      <div className="text-center py-4 mt-3">
                          <MDBBtn className="btn btn-info Ripple-parent btn-block" color="info" onClick={this.onClickGenerate}>
                              Generate keys
                          </MDBBtn>
                        </div>
                        <MDBInput                  
                          name="publicKey"
                          label="Your Public key"
                          icon="key"
                          group
                          type="text"
                          validate
                          value={this.state.publicKey}
                          readOnly
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
