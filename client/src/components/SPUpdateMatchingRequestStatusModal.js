import React, { Component } from 'react';
import { MDBContainer,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class SPUpdateMatchingRequestStatusModal extends Component {

constructor(props) {
    super(props);
    this.state = {
        isOpen: props.isOpen,
        dnaFileContent: "",
        userKey: ""
    };
    let fileReader;
    this.handleFileChosen = this.handleFileChosen.bind(this);
    this.handleFileRead = this.handleFileRead.bind(this);
    this.handleUserKeyChanged = this.handleUserKeyChanged.bind(this);
}

toggle = (didCloseFromCancel) => {
  this.setState({
    isOpen: !this.state.isOpen
  });
  this.props.handleClose(didCloseFromCancel, this.state.dnaFileContent, this.state.userKey);
}

handleUserKeyChanged(event) {
  if (event.target.value.length > 0) {
    this.setState({
      userKey: event.target.value
    });
  }
}

componentWillReceiveProps(newProps) {
  if (newProps != this.props) {
    this.setState({
      isOpen: newProps.isOpen
    });
  }
}

handleFileRead() {
  const content = this.fileReader.result;
  console.log(content);
  this.setState({
    dnaFileContent: content
  });
}

handleFileChosen(file) {
  this.fileReader = new FileReader();
  this.fileReader.onloadend = this.handleFileRead;
  if (file) {
    this.fileReader.readAsText(file);
  }
}

render() {
  if (this.props.type === 'Read') {
    return (
      <div>
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle(true)}}>
          <MDBModalHeader toggle={() => {this.toggle(true)}}>Yes!</MDBModalHeader>
          <MDBModalBody>
            You've updated the matching request status to "Read"
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="info" onClick={() => {this.toggle(false)}}>Ok, Got it</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  } else if (this.props.type === 'Approved'){
    return (
      <div>
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle(true)}}>
          <MDBModalHeader toggle={() => {this.toggle(true)}}>Yes!</MDBModalHeader>
          <MDBModalBody>
            You've updated the matching request status to "Approved" <br></br>
            Upload your DNA file and confirm
            <div className="user-key-input" style={{ marginTop: "1rem"}}>
              <input type="text" className="form-control" placeholder="Your private key" onChange={this.handleUserKeyChanged}/>
            </div>
            <div className="input-group">
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
            <MDBBtn color="info" onClick={() => {this.toggle(false)}}>Approve</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  } else {
    return null;
  }
}

}

export default SPUpdateMatchingRequestStatusModal;
