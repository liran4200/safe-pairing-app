import React, { Component } from 'react';
import 'bulma';

class  SPRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    }
  }

  componentDidMount() {
    this.setState({
      status: this.props.status
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.status
    });
  }

  render() {
    return (
      <div className="request-view">
        {this.props.matchingUser} &nbsp;
        <div className="request-status">
          {this.state.status}
        </div>
      </div>
    );
  }


}

export default SPRequest;
