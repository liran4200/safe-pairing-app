import React, { Component } from 'react';
import SPNotificationsList from '../components/SPNotificationsList.js';
import { getNotifications } from '../serverCalls/NotificationAPI.js'

class SPNotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: props.notifications
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      var notificationsList = this.state.notifications;
      if (newProps.typeOfMessage === 'notify') {
          notificationsList.push(newProps.socketData);
      } else if (newProps.typeOfMessage === 'updateStatus') {
          for (var i in notificationsList) {
            if (newProps.socketData._id) {
              if (notificationsList[i]._id === newProps.socketData._id) {
                if (newProps.socketData.status) {
                    notificationsList[i].status = newProps.socketData.status;
                    break;
                }
              }
            }
          }
      }
      this.setState({
        notifications: notificationsList
      });
    }
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
