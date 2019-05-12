import React, { Component } from 'react';
import SPUsersList from '../components/SPUsersList.js';
import SPSendRequestModal from '../components/SPSendRequestModal'
import '../styles/SPSearchUserPage.css';
import {DebounceInput} from 'react-debounce-input';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBtn } from "mdbreact";
import { searchUser } from '../serverCalls/UsersAPI.js'
import { sendMatchingRequest } from '../serverCalls/matchingRequestAPI.js';
import eosio from '../utils/eosioClient.js'

class SPSearchUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      modal: false,
      userToSendRequest: {}
    }
    this.sendRequest = this.sendRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async sendRequest(user) {
    this.setState({
      modal: true,
      userToSendRequest: user
    });
  }

  async closeModal(didCloseFromCancel, userKey, dnaFileContent) {
    //if the user closed the modal from "approve" button - send a matching request, else, just close the modal without sending request
    if (!didCloseFromCancel) {
      console.log('userKey:\n', userKey);
      let eos = new eosio(userKey);
      console.log("dna in serchUserPage: " + dnaFileContent);
      let res = await eos.transaction('spacc',
                                       this.props.currentUser.eosAcc,
                                       'upsert',
                                       {
                                         user: this.props.currentUser.eosAcc,
                                         dna: dnaFileContent
                                       });
      console.log(res);
      eos = null;
      res = await sendMatchingRequest(localStorage.getItem('token'), this.props.currentUser._id , this.state.userToSendRequest.userId);
      console.log("res from send matching request:\n",res);
    }
    this.setState({
      modal: false
    });
  }

  async handleChange(e) {
    let newUsersList = [];
    if (e.target.value !== "") {
      newUsersList = await searchUser(e.target.value, localStorage.getItem('token'));
    } else {
      newUsersList = [];
    }
    this.setState({
      users: newUsersList
    });
  }

  render() {
    return (
      <MDBContainer>
        <SPSendRequestModal
          isOpen={this.state.modal}
          userToSendTo={this.state.userToSendRequest.firstName + " " + this.state.userToSendRequest.lastName}
          handleClose={this.closeModal}
        />
        <DebounceInput
          debounceTimeout={700}
          type="text"
          className="input"
          placeholder="Find your matching partner..."
          onChange={this.handleChange}
        />
        <SPUsersList users={this.state.users} sendRequest={this.sendRequest} />
      </MDBContainer>
    )
  }
}

export default SPSearchUserPage;
