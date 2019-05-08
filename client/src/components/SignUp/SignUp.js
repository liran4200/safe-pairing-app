import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import {registerUser, confirmUser} from '../../serverCalls/UsersAPI';
import './SignUp.css';
import ConfirmEmailModal from '../ConfirmEmailModal/ConfirmEmailModal';
import GenerateKeysModal from '../GenerateKeysModal/GenerateKeysModal';
import {MDBCardHeader,MDBIcon,toast,ToastContainer,MDBModalFooter, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
 
class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       fname: {
         value: "",
         valid: false,
         msg: "",
       },
       lname: {
         value: "",
         valid: false,
         msg: ""
       },
       email: {
          value: "",
          valid: false,
          msg: ""
       },
       confirmEmail: {
          value: "",
          valid: false,
          msg: ""
       },
       password: {
          value: "",
          valid: false,
          msg: ""
       },
       publicKey: {
          value: "",
          valid: false,
          msg: ""
       },
       isOpenConfirm: false,
       isSubmitBtn: true,
       isOpenGenerate: false,
       submitText: "Sign Up",
       userId: "",
       shouldRedirect: false
    };
    this.validMsg = 'Looks good!';
  }

  submitHandler = async (event) => {
    event.preventDefault();
    if(!this.isAllValid()) {
      this.notify('Please fill all the fields correctly before submiting','error');
      return;
    }
    const res = await this.register();

    if(res.error) {
        this.notify(res.error,'error');
    }
    else {
      this.notify('Registered successfully, please confirm your email!','success');
      this.setState({
        isOpenConfirm: !this.state.isOpenConfirm,
        submitText: "Confirm",
        userId: res._id,
        isSubmitBtn: false
      });
    }  
  }

  handlePUChange = (event) => {
    let isValid, msg;
    if(event.target.value.trim().length !== 0 ) {
        isValid = true;
        msg = this.validMsg;
    }
    else {
      isValid = false;
      msg = 'Please generate your keys!';
    }
    this.setState({ 
      [event.target.name]: {
        value: event.target.value,
        valid: isValid,
        msg: msg,
       }
   });
  }

  handleNameChange = (event) => {
    let isValid, msg;
    if(this.validName(event.target.value)){
        isValid = true;
        msg = this.validMsg;
    }
    else {
      isValid = false;
      msg = 'name must be at least 2 letters';
    }
    this.setState({ 
      [event.target.name]: {
        value: event.target.value.trim(),
        valid: isValid,
        msg: msg
       }
   });
  }

  handleEmailChange = (event) => {
    let isValid, msg;
    if(this.validateEmail(event.target.value)) {
      isValid = true;
      msg = this.validMsg;
    }
    else{
      isValid = false;
      msg = 'Please enter a valid email';
    }
    
    this.setState({
      [event.target.name]: {
          value: event.target.value.trim(),
          valid: isValid,
          msg: msg
      }
    });
  }

  onConfirmEmailBlur = () => {
      if(this.state.email.value !== this.state.confirmEmail.value) {
          this.setState({
            confirmEmail: {
              msg: 'Please confirm your email again',
              value: this.state.confirmEmail.value,
              valid: false
            }
          });
      }
  }

  handlePasswordChange = (event) => {
      let isValid,msg
      if(event.target.value.length === 0 || event.target.value.length < 5) {
        isValid = false;
        msg = 'Please enter at least 5 letters';
      }
      else {
        isValid = true;
        msg = this.validMsg;
      }
        this.setState ({
          password: {
              value: event.target.value.trim(),
              valid: isValid,
              msg: msg
          }
        });
  }

  handleConfirmationModal = async (code) => {
    console.log(code);
    const res = await confirmUser(this.state.userId,code);
    if(res.error) {
        this.notify(res.error,'error');
    }
    else{
      this.notify('Confirmation Successfully!','success');
      setTimeout(
        () => this.setState({
          shouldRedirect: !this.state.shouldRedirect,
          isOpenConfirm: false
      }),
      1100
      ); 
      
    }
  }

  handleGenerateKeysModal = async (publicKey) => {
      this.setState({
      publicKey: {
        value: publicKey,
        valid: true,
        msg: this.validMsg
      }
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

  isAllValid = () =>{
    return (this.state.fname.valid 
           && this.state.lname.valid 
           && this.state.email.valid
           && this.state.confirmEmail.valid 
           && this.state.password.valid 
           && this.state.publicKey.valid);
  }


  validName = (name) => {
     if(name.length === 0 || name.length < 2) 
        return false;
     return true;
  }

  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onClickGenerate = () => {
    this.setState({
      isOpenGenerate: !this.state.isOpenGenerate
    });
  }

  register = async () => {
    const user = {
      firstName: this.state.fname.value,
      lastName: this.state.lname.value,
      email: this.state.email.value,
      password: this.state.password.value,
      publicKey: this.state.publicKey.value
    }

    const response = await registerUser(user);
    return response;
  }

  notify = (message,type) => {
    switch(type) {
        case "success":
          toast.success(message);
          break;

        case "error":
          toast.error(message);
          break;
        default:
          break;
    }

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
                      onSubmit={
                        this.state.isSubmitBtn? this.submitHandler: (event) => {    
                          event.preventDefault();
                          this.setState({isOpenConfirm: true}) 
                        }
                      }
                    >
                      <div className="grey-text">
                        <MDBInput
                          name="fname"
                          label="First name"
                          icon="user"
                          group
                          type="text"
                          error="wrong"
                          success="right"
                          onChange={this.handleNameChange}
                          value={this.state.fname.value}
                          className={this.state.fname.valid ? "is-valid" : "is-invalid"}
                        >
                        <div className="valid-feedback">{this.state.fname.msg}</div>
                        <div className="invalid-feedback">{this.state.fname.msg}</div>
                        </MDBInput>
                        <MDBInput
                          name="lname"
                          label="Last name"
                          icon="user"
                          group
                          type="text"
                          error="wrong"
                          success="right"  
                          onChange={this.handleNameChange}
                          value={this.state.lname.value}
                          className={this.state.lname.valid ? "is-valid" : "is-invalid"}
                        >
                        <div className="valid-feedback">{this.state.lname.msg}</div>
                        <div className="invalid-feedback">{this.state.lname.msg}</div>
                        </MDBInput>
                        <MDBInput
                          name="email"
                          label="Your email"
                          icon="envelope"
                          group
                          type="email"
                          error="wrong"
                          success="right"
                          onChange={this.handleEmailChange}
                          value={this.state.email.value}
                          className={this.state.email.valid ? "is-valid" : "is-invalid"}
                        >
                        <div className="valid-feedback">{this.state.email.msg}</div>
                        <div className="invalid-feedback">{this.state.email.msg}</div>
                        </MDBInput>
                        <MDBInput
                          name="confirmEmail"
                          label="Confirm your email"
                          icon="exclamation-triangle"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                          onChange={this.handleEmailChange}
                          onBlur={this.onConfirmEmailBlur}
                          value={this.state.confirmEmail.value}
                          className={this.state.confirmEmail.valid ? "is-valid" : "is-invalid"}
                        >
                        <div className="valid-feedback">{this.state.confirmEmail.msg}</div>
                        <div className="invalid-feedback">{this.state.confirmEmail.msg}</div>
                        </MDBInput> 
                        <MDBInput
                          name="password"
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          onChange={this.handlePasswordChange}
                          value={this.state.password.value}
                          className={this.state.password.valid ? "is-valid" : "is-invalid"}
                        >
                        <div className="valid-feedback">{this.state.password.msg}</div>
                        <div className="invalid-feedback">{this.state.password.msg}</div> 
                        </MDBInput>
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
                          value={this.state.publicKey.value}
                          readOnly
                          onChange={this.handlePUChange}
                          className={this.state.publicKey.valid ? "is-valid" : "is-invalid"}
                        >
                        <div className="valid-feedback">{this.state.publicKey.msg}</div>
                        <div className="invalid-feedback">{this.state.publicKey.msg}</div> 
                        </MDBInput>
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn size="lg" color="primary" type="submit">
                          {this.state.submitText}
                        </MDBBtn>
                        <ToastContainer
                      hideProgressBar={true}
                      newestOnTop={true}
                      autoClose={5000}
                    />
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
