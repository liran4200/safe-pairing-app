import React, { Component } from 'react';
import SPNotification from './SPNotification.js'

class SPNotificationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsList: props.notificationsList
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({
        notificationsList: newProps.notificationsList
      });
    }
  }

  render() {
    if (this.state.notificationsList) {
      return(
        <div className="d-flex flex-row flex-wrap mx-auto">
          {this.state.notificationsList.map(notification => (
              <SPNotification
                senderUser={notification.senderUser}
                receiverUser={notification.receiverUser}
                requestStatus={notification.status}
                notificationId={notification.notificationId}
                senderId={notification.senderId}
                receiverId={notification.receiverId}
              />
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SPNotificationsList;
