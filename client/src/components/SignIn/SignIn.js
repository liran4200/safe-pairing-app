import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import {login} from '../../serverCalls/LoginAPI';
import {notify} from '../../utils/notify';
import './SignIn.css';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
  ToastContainer
} from "mdbreact";

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        email: {
          value: '',
          valid: false,
          msg: ''
        },
        password: {
            value: '',
            valid: false,
            msg: ''
        },
        shouldRedirect: false
    };
    this.validMsg = 'Looks good!'
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

  handlePasswordChange = (event) => {
    let isValid,msg
    if(event.target.value.trim().length === 0) {
      isValid = false;
      msg = 'Please enter password';
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
  
  validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  submitHandler = async (event) => {
    event.preventDefault();
    console.log('insubmit')
    if(!this.state.email.valid || !this.state.password.valid){
        console.log('invalid');
        notify('Please fill all the fields correctly','error');
        return;
    }

    const res = await login({
      email: this.state.email.value,
      password: this.state.password.value
    });

    if(res.error) {
        notify(res.error,'error');
        return;
    }
    notify('Login Success!','success');
    localStorage.setItem('token',res.token);
    setTimeout(() => {
      this.setState({
          shouldRedirect: true
      });
    },
    800);
    

    
    }

  render(){
    if(this.state.shouldRedirect)
        return <Redirect to="/dashboard/searching"/>
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
                  onSubmit={this.submitHandler}
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
                      onChange={this.handleEmailChange}
                      value={this.state.email.value}
                      className={this.state.email.valid ? "is-valid" : "is-invalid"}
                    >
                     <div className="valid-feedback">{this.state.email.msg}</div>
                     <div className="invalid-feedback">{this.state.email.msg}</div>
                    </MDBInput>
                    <MDBInput
                      name="password"
                      label="Type your password"
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
                  <ToastContainer
                      hideProgressBar={true}
                      newestOnTop={true}
                      autoClose={5000}/>
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
