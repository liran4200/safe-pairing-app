import React, { Component } from 'react';

class SPUsersList extends React.Component {

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
              <li key={user}>
                {user} &nbsp;
                <span
                  className="send-request-button"
                  onClick={() => this.props.sendRequest(user)}
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
