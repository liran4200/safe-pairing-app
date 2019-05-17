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
    if (this.props != newProps) {
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
                ownerId={notification.ownerId}
                type={notification.type}
                senderUser={notification.senderUser}
                receiverUser={notification.receiverUser}
                requestStatus={notification.matchingRequestStatus}
                notificationStatus={notification.status}
                updateDate={notification.updateDate}
                markAsRead={() => this.props.updateRequestStatus(notification.matchingRequestId, notification.receiverUser._id, notification.senderUser._id, 'Read', notification.notificationId)}
                approveMatchingRequest={() => this.props.updateRequestStatus(notification.matchingRequestId, notification.receiverUser._id, notification.senderUser._id, 'Approved', notification.notificationId)}
                markNotificationAsRead={() => this.props.updateNotification(notification.notificationId, notification.receiverUser._id, 'Read')}
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
