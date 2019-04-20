import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
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
        <div className="d-flex flex-row flex-wrap example-parent mx-auto">
          {this.state.requestsList.map(request => (
              <SPRequest
                matchingUser={request.matchingUser}
                status={request.status}
              />
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
export default SPRequestList;