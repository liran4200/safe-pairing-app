import React, { Component } from 'react';
import 'bulma';
import SPRequest from './SPRequest.js';

class SPRequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestsList: []
    }
  }

  componentDidMount() {
    this.setState({
      requestsList: this.props.requestsList
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      requestsList: newProps.requestsList
    })
  }

  render() {
    if (this.state.requestsList) {
      return(
            <div>
              <ul>
                {this.state.requestsList.map(request => (
                  <li key={request}>
                    <SPRequest
                      matchingUser={request.matchingUser}
                      status={request.status}
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
export default SPRequestList;
