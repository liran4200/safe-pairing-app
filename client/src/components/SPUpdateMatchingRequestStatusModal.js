import React, { Component } from 'react';
import { MDBContainer,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class SPUpdateMatchingRequestStatusModal extends Component {

constructor(props) {
    super(props);
    this.state = {
        isOpen: props.isOpen,
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
        isOpen: newProps.isOpen
      });
  }
}

render() {
  if (this.props.type === 'Read') {
    return (
      <div>
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle()}}>
          <MDBModalHeader toggle={() => {this.toggle()}}>Yes!</MDBModalHeader>
          <MDBModalBody>
            You've updates the matching request status to "Read"
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="info" onClick={() => {this.toggle()}}>Ok, Got it</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  } else if (this.props.type === 'Approved'){
    return (
      <div>
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle()}}>
          <MDBModalHeader toggle={() => {this.toggle()}}>Yes!</MDBModalHeader>
          <MDBModalBody>
            You've updates the matching request status to "Approved" <br></br>
            Upload your DNA file and confirm
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
            <MDBBtn color="info" onClick={() => {this.toggle()}}>Approve</MDBBtn>
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
