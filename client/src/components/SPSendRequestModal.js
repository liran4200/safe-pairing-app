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
  this.props.closeModal();
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
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle()}} size="sm">
          <MDBModalHeader toggle={() => {this.toggle()}}>Yes!</MDBModalHeader>
          <MDBModalBody>
            Youv'e just sent a matching request to {this.state.userToSendTo} <br></br>
            You can see the matching status in "Matching Statuses" section.
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="danger" onClick={() => {this.toggle()}}>Ok, Got it</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default SPSendRequestModal;
