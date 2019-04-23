import React, { Component } from 'react';

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
        <div className="d-flex flex-row flex-wrap example-parent mx-auto">
          {this.state.notificationsList.map(notification => (
              <SPNotification
                senderUser={notification.senderUser}
                requestStatus={notification.status}
                notificationType={notification.type}
                notificationId={notification.id}
                otherUserId={notification.otherUserId}
              />
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
