import React, { Component } from 'react';
import 'bulma';
import SPUsersList from '../components/SPUsersList.js';
import '../styles/SPSearchUserPage.css';
import {DebounceInput} from 'react-debounce-input';
import { searchUser } from '../serverCalls/UsersAPI.js'
import { sendNotification } from '../serverCalls/notificationAPI';

class SPSearchUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.sendRequest = this.sendRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async sendRequest(user) {
    let res = await sendNotification('aaa');
  }

  async handleChange(e) {
    let newUsersList = [];
    if (e.target.value !== "") {
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
      <div className="content">
        <div className="container">
          <section className="section">
            <DebounceInput
              debounceTimeout={700}
              type="text"
              className="input"
              placeholder="Search users..."
              onChange={this.handleChange}
            />
            <SPUsersList users={this.state.users} sendRequest={this.sendRequest} />
          </section>
        </div>
      </div>
    )
  }
}

export default SPSearchUserPage;
