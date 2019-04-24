import React, { Component } from 'react';
import SPNotificationsList from '../components/SPNotificationsList.js';
import { getNotifications } from '../serverCalls/NotificationAPI.js'

class SPNotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
  }

  async componentDidMount() {
    const res = await getNotifications('aaa');
    this.setState({
      notifications: res
    });
  }

  render() {
    return (
      <SPNotificationsList
        notificationsList={this.state.notifications}
      />
    )
  }

}

export default SPNotificationsPage;
