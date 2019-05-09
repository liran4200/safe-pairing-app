import React, { Component } from 'react';
import SPUsersList from '../components/SPUsersList.js';
import SPSendRequestModal from '../components/SPSendRequestModal'
import '../styles/SPSearchUserPage.css';
import {DebounceInput} from 'react-debounce-input';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBtn } from "mdbreact";
import { searchUser } from '../serverCalls/UsersAPI.js'
import { sendMatchingRequest } from '../serverCalls/matchingRequestAPI.js';

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

  async closeModal(didCloseFromCancel, dnaFileContent) {
    //if the user closed the modal from cancel button - don't send a matching request
    if (!didCloseFromCancel) {
      console.log("dna in serchUserPage: " + dnaFileContent);
      //TODO change 'aaa' in a real token + send file content to EOS contract
      let res = await sendMatchingRequest('aaa', '5cb6c2f7262b2c2779d0da13', this.state.userToSendRequest.userId);
    }
    this.setState({
      modal: false
    });
  }

  async handleChange(e) {
    let newUsersList = [];
    if (e.target.value !== "") {
      //TODO change 'aaa' in a real token
      newUsersList = await searchUser(e.target.value, 'aaa');
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
