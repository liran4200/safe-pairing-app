import React, { Component } from 'react';
import 'bulma';
import SPUsersList from '../components/SPUsersList.js';
import '../styles/SPSearchUserPage.css';
import {DebounceInput} from 'react-debounce-input';
import { searchUser } from '../serverCalls/UsersAPI.js'

class SPSearchUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      plainUsers: [
       {
          firstName: "Liran",
          lastName: "Yehudar",
          email: "liran@gmail.com"
        },
        {
          firstName: "Dudu",
          lastName: "Krich",
          email: "dudu@gmail.com"
        },
        {
          firstName: "Nir",
          lastName: "Finz",
          email: "nir@gmail.com"
        },
        {
          firstName: "Gal",
          lastName: "Zaidman",
          email: "gal@gmail.com"
        }
      ]
    }
    this.sendRequest = this.sendRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendRequest(user) {
    //invoke sendMatchingRequest API call with user.id.
    console.log(user.email);
  }

  async handleChange(e) {
    //invoke searchUser API call with e.target.value
    //update users with setState
    //should implement with throttle

      // Variable to hold the filtered list before putting into state
      let newList = [];
      // If the search bar isn't empty
      if (e.target.value !== "") {
      newList = await searchUser(e.target.value, 'aaa');
    } else {
        // If the search bar is empty, set newList to original task list
        newList = [];
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      users: newList
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
