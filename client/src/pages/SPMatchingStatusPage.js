import React, { Component } from 'react';
import 'bulma';
import SPRequestsList from '../components/SPRequestsList.js';
import { getMatchingRequests } from '../serverCalls/matchingRequestAPI.js';
import { MDBBadge } from "mdbreact";
import '../styles/SPMatchingStatusPage.css';

class SPMatchingStatusPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchingRequestsList: []
    }
  }

  async componentDidMount() {
    //TODO update token
    let requestsList = await getMatchingRequests('aaa', '5cb6c2f7262b2c2779d0da13');
    this.setState({
      matchingRequestsList: requestsList
    });
  }

  render() {
    return (
      <div className="matching-status-page-content">
        <div className="matching-status-container">
          <section className="section">
            <SPRequestsList requestsList={this.state.matchingRequestsList} />
          </section>
        </div>
      </div>
    )
  }

}

export default SPMatchingStatusPage
