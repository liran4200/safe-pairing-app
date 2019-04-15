import React, { Component } from 'react';
import 'bulma';
import SPUsersList from '../Components/SPUsersList.js';

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
  }

  handleChange(e) {
    //invoke searchUser API call with e.target.value
    //update users with setState
    //should implement with throttle

      // Variable to hold the original version of the list
      let currentList = [];
      // Variable to hold the filtered list before putting into state
      let newList = [];

      // If the search bar isn't empty
      if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.plainUsers;
      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        // change current item to lowercase
        const lc = item.firstName.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
          // check to see if the current list item includes the search term
          // If it does, it will be added to newList. Using lowercase eliminates
          // issues with capitalization in search terms and search content
          return lc.includes(filter);
      });
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
            <input type="text" className="input" placeholder="Search users..."  onChange={this.handleChange} />
            <SPUsersList users={this.state.users} sendRequest={this.sendRequest} />
          </section>
        </div>
      </div>
    )
  }
}

export default SPSearchUserPage;
