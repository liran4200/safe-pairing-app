import React, { Component } from 'react';
import 'bulma';
import SPRequestsList from '../components/SPRequestsList.js';
import { getMatchingRequests } from '../serverCalls/matchingRequestAPI.js';
import '../styles/SPMatchingStatusPage.css';

class SPMatchingStatusPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchingRequestsList: []
    }
  }

  async componentDidMount() {
    let requestsList = await getMatchingRequests( localStorage.getItem('token'), this.props.currentUser._id);
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
