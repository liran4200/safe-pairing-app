import React, { Component } from 'react';
import { MDBContainer,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class SPSendRequestModal extends Component {

constructor(props) {
    super(props);
    this.state = {
        isOpen: props.isOpen,
        userToSendTo: ""
    };
}

toggle = () => {
  this.setState({
    isOpen: !this.state.isOpen
  });
  this.props.handleClose();
}

componentWillReceiveProps(newProps) {
  if (newProps != this.props ){
      this.setState({
        isOpen: newProps.isOpen,
        userToSendTo: newProps.userToSendTo
      });
  }
}

render() {
  return (
      <div>
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle()}}>
          <MDBModalHeader toggle={() => {this.toggle()}}>Yes!</MDBModalHeader>
          <MDBModalBody>
            Youv'e just sent a matching request to {this.state.userToSendTo} <br></br>
            You can see the matching status in "Matching Statuses" section.
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
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose your DNA file
                </label>
              </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="info" onClick={() => {this.toggle()}}>Ok, Got it</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default SPSendRequestModal;
