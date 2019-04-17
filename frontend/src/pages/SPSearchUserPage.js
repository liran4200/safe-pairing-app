import React, { Component } from 'react';
import 'bulma';
import SPUsersList from '../components/SPUsersList.js';
import '../styles/SPSearchUserPage.css';
import {DebounceInput} from 'react-debounce-input';
import { searchUser } from '../serverCalls/UsersAPI.js'
import { sendNotification } from '../serverCalls/NotificationAPI';

class SPSearchUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      u: [
        {
          firstName: "yuri",
          lastName: "vainstain",
          email: "yuri@gmail.com"
        },
        {
          firstName: "liran",
          lastName: "yehudar",
          email: "liran@gmail.com"
        }
      ]
    }
    this.sendRequest = this.sendRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async sendRequest(user) {
    //TODO change 'aaa' in a real token
    let res = await sendNotification('aaa');
    //what to do with res.id? should store notifications id's?
  }

  async handleChange(e) {
    let newUsersList = [];
    let currentList = [];
    if (e.target.value !== "") {
      //TODO change 'aaa' in a real token
      // newUsersList = await searchUser(e.target.value, 'aaa');
      currentList = this.state.u;
      newUsersList = currentList.filter(item => {
        const lc = item.firstName.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
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
