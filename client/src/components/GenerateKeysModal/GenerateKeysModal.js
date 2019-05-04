import React, { Component } from 'react';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import './GenerateKeysModal.css';
import ecc from 'eosjs-ecc';

class GenerateKeysModal extends Component {

constructor(props) {
    super(props);
    this.state = {
        isOpen: props.isOpen,
        publicKey: "",
        privateKey: "",
        isGenerating: false
    };
}

toggle = () => {
  this.setState({
    isOpen: !this.state.isOpen
  });

  this.props.handleClose();
}

handleGenerate = (e) => {
    this.setState({
        isGenerating: !this.state.isGenerating
    });
    ecc.randomKey().then(privateKey => {
        console.log('Private Key:\t', privateKey) // wif
        console.log('Public Key:\t', ecc.privateToPublic(privateKey)) // EOSkey...
        setTimeout(
        this.setState({
            privateKey: privateKey,
            publicKey: ecc.privateToPublic(privateKey),
            isGenerating: !this.state.isGenerating
        }),4000);
        this.props.handleGenerate(this.state.publicKey);
    });
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
  const spinner = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>;
  return (
        <MDBModal isOpen={this.state.isOpen} toggle={() => {this.toggle()}} centered>
          <MDBModalHeader toggle={() => {this.toggle()}}>Generate Your Account's Keys</MDBModalHeader>
          <MDBModalBody>
            <div className="form-group">
                <input 
                    placeholder="Public Key"
                    type="text" 
                    className="form-control form-control-sm"
                    value={this.state.publicKey} 
                    readOnly
                 />
           </div>
           <div className="form-group">
                <input 
                    placeholder="Private Key"
                    type="text" 
                    id="code" 
                    className="form-control form-control-sm" 
                    value={this.state.privateKey}
                    readOnly
                 />
           </div>
           <span className="label label-warning">Security Warning: keep your private key safetly, You will use in our app</span>

          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="deep-orange" onClick={() => {this.toggle()}}>Close</MDBBtn>
            <button className="btn btn-success" onClick={(e)=>{this.handleGenerate(e)}} type="button">
                {this.state.isGenerating? spinner : 'Generate Keys'}
            </button>
          </MDBModalFooter>
        </MDBModal>
    );
  }
}

export default GenerateKeysModal;