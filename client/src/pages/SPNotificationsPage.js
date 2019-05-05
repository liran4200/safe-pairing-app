import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import SPNotificationsList from '../components/SPNotificationsList.js';
import { getNotifications } from '../serverCalls/NotificationAPI.js';
import { updateMatchingRequestStatus } from '../serverCalls/matchingRequestAPI.js';
import { updateNotificationStatus } from '../serverCalls/NotificationAPI.js';
import SPupdateMatchingRequestStatusModal from '../components/SPUpdateMatchingRequestStatusModal.js'


class SPNotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      modal: false,
      modalType: ''
    }
    this.updateMatchingRequestStatus = this.updateMatchingRequestStatus.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateNotificationStatus = this.updateNotificationStatus.bind(this);
  }

  async componentDidMount() {
    const res = await getNotifications('aaa', '5cb6c2f7262b2c2779d0da13');
    this.setState({
      notifications: res
    });
  }

  async updateMatchingRequestStatus(token, matchingRequestId, receiverId, senderId, status, notificationId) {
    const res = await updateMatchingRequestStatus(token, matchingRequestId, receiverId, senderId, status);
    this.setState({
      modal: true,
      modalType: status
    });
    //update notification status for UI - owner in this case is always the receiver
    await updateNotificationStatus(token, notificationId, receiverId, status);
  }

  async updateNotificationStatus(token, notificationId, ownerId, status) {
    const res = await updateNotificationStatus(token, notificationId, ownerId, status);
    const notificationsToUpdate = this.state.notifications;
    for (var i in notificationsToUpdate) {
      if (notificationsToUpdate[i].notificationId === notificationId) {
        notificationsToUpdate[i].status = status;
        break;
      }
    }
    this.setState({
      notifications: notificationsToUpdate
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
        <SPupdateMatchingRequestStatusModal
          isOpen={this.state.modal}
          type={this.state.modalType}
          handleClose={this.closeModal}
        />
        <SPNotificationsList
          notificationsList={this.state.notifications}
          updateMatchingRequestStatus={this.updateMatchingRequestStatus}
          updateNotificationStatus={this.updateNotificationStatus}
        />
      </MDBContainer>
    )
  }

}

export default SPNotificationsPage;
