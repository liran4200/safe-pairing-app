import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import SPNotificationsList from '../components/SPNotificationsList.js';

class SPNotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    }
  }

  componentDidMount() {
    const socket = socketIOClient("https://localhost:4444");
    socket.on("notify", notification => {
      let notificationsList = this.state.notifications;
      notificationsList.push(notification);
      this.setState({
        notifications: notificationsList
      });
    });
    socket.on("updateStatus", notification => {
      let notificationsList = this.state.notifications;
      for (var i in notificationsList) {
        if (notification.id) {
          if (notificationsList[i]._id === notification.id) {
            if (notification.status) {
                notificationsList[i].status = notification.status;
                break;
            }
          }
        }
      }
      this.setState({
        notifications: notificationsList
      });
    });
  }

  render() {
    return (
      <SPNotificationsList
        notificationsList={this.state.notificationsList}
      />
    )
  }

}

export default SPNotificationsPage;
