import React, { Component } from 'react';
import SPUser from './SPUser.js';

class SPUsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.setState({
      users: this.props.users
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      users: newProps.users
    });
  }

  render() {
    if (this.state.users) {
      return(
        <div>
          <ul>
            {this.state.users.map(user => (
              <li key={user.email}>
                <SPUser
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  sendRequest={() => this.props.sendRequest(user)}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SPUsersList;
