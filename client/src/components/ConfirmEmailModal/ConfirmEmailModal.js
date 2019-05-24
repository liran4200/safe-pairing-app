import React, { Component } from 'react';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './ConfirmEmailModal.css'

class ConfirmEmailModal extends Component {

constructor(props) {
    super(props);
    this.state = {
        isOpen: props.isOpen,
        code: ""
    };
}

toggle = () => {
  this.setState({
    isOpen: !this.state.isOpen
  });

  this.props.handleClose();
}

handleConfirm = () => {
  this.props.handleConfirm(this.state.code);
  this.setState({code:""});
}

componentWillReceiveProps(nextProps) {
    console.log(`received props:\n ${nextProps.isOpen}`)
    if(nextProps !== this.props ){
        this.setState({
            isOpen: nextProps.isOpen
        })
    }
}

render() {
  return (
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle()}} centered>
          <MDBModalHeader toggle={() => {this.toggle()}}>Email Confiramtion</MDBModalHeader>
          <MDBModalBody>
            <div className="form-group">
                <label htmlFor="code">Confirmation code was sent to your email</label>
                <input 
                    type="number" 
                    id="code" 
                    value={this.state.code}
                    placeholder="code"
                    className="form-control form-control-sm" 
                    onChange={(event)=> {this.setState({code:event.target.value})}}
                 />
           </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="deep-orange" onClick={() => {this.toggle()}}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={()=>{this.handleConfirm()} }>CONFIRM </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
    );
  }
}

export default ConfirmEmailModal;