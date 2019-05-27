import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { notify } from '../utils/notify'
import ecc from 'eosjs-ecc';

class SPSendRequestModal extends Component {

constructor(props) {
    super(props);
    this.state = {
        isOpen: props.isOpen,
        userToSendTo: "",
        dnaFileContent: "",
        userKey: ""
    };
    this.handleFileChosen = this.handleFileChosen.bind(this);
    this.handleFileRead = this.handleFileRead.bind(this);
    this.handleUserKeyChanged = this.handleUserKeyChanged.bind(this);
    this.userKeyValid = this.userKeyValid.bind(this);
}

toggle = (didCloseFromCancel) => {
  if ((this.userKeyValid(this.state.userKey) && this.state.dnaFileContent.length > 0) || didCloseFromCancel) {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.props.handleClose(didCloseFromCancel, this.state.userKey, this.state.dnaFileContent);
  } else {
      notify("Oops! make sure your secret code is valid and DNA file uploaded!", "error");
  }
}

userKeyValid(userKey) {
  return ecc.isValidPrivate(userKey);
}

componentWillReceiveProps(newProps) {
  if (newProps != this.props ){
      this.setState({
        isOpen: newProps.isOpen,
        userToSendTo: newProps.userToSendTo
      });
  }
}

handleUserKeyChanged(event) {
  if (event.target.value.length > 0) {
    this.setState({
      userKey: event.target.value
    });
  }
}

handleFileRead() {
  const content = this.fileReader.result;
  console.log(content);
  if (content) {
      this.setState({
        dnaFileContent: content
      })
  }

}

handleFileChosen(file) {
  this.fileReader = new FileReader();
  this.fileReader.onloadend = this.handleFileRead;
  if (file) {
      this.fileReader.readAsText(file);
  }
}

render() {
  return (
      <div>
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle(true)}}>
          <MDBModalHeader toggle={() => {this.toggle(true)}}>Yes!</MDBModalHeader>
          <MDBModalBody>
            You are about to send a matching request to {this.state.userToSendTo} <br></br>
            Upload your DNA file and you're good to go
            <div className="user-key-input" style={{ marginTop: "1rem"}}>
              <input type="text" className="form-control" placeholder="Your secret key from sign up" onChange={this.handleUserKeyChanged}/>
            </div>
            <div className="input-group" style={{ marginTop: "1rem"}}>
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  accept='.DNA'
                  onChange={e => this.handleFileChosen(e.target.files[0])}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose your DNA file
                </label>
              </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="info" onClick={() => {this.toggle(false)}}>Send matching request</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default SPSendRequestModal;
