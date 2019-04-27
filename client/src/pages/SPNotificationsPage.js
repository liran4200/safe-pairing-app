import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import SPNotificationsList from '../components/SPNotificationsList.js';
import { getNotifications } from '../serverCalls/NotificationAPI.js';
import { updateNotificationStatus } from '../serverCalls/NotificationAPI.js';
import SPUpdateNotificationStatusModal from '../components/SPUpdateNotificationStatusModal.js'


class SPNotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      modal: false,
      modalType: ''
    }
    this.updateNotificationStatus = this.updateNotificationStatus.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const res = await getNotifications('aaa');
    this.setState({
      notifications: res
    });
  }

  async updateNotificationStatus(token, notificationId, receiverId, senderId, status) {
    const res = await updateNotificationStatus(token, notificationId, receiverId, senderId, status);
    this.setState({
      modal: true,
      modalType: status
    });
  }

  closeModal() {
    this.setState({
      modal: false,
      modalType: ''
    })
  }

  render() {
    return (
      <MDBContainer>
        <SPUpdateNotificationStatusModal
          isOpen={this.state.modal}
          type={this.state.modalType}
          handleClose={this.closeModal}
        />
        <SPNotificationsList
          notificationsList={this.state.notifications}
          updateNotificationStatus={this.updateNotificationStatus}
        />
      </MDBContainer>
    )
  }

}

export default SPNotificationsPage;
