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
      modalType: '',
      dataForUpdateRequest: {}
    }
    this.updateRequestStatus = this.updateRequestStatus.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
  }

  async componentDidMount() {
    const res = await getNotifications('aaa', '5cb6c2f7262b2c2779d0da13');
    console.log(res);
    this.setState({
      notifications: res
    });
  }

  updateRequestStatus(token, matchingRequestId, receiverId, senderId, status, notificationId) {
    this.setState({
      modal: true,
      modalType: status,
      dataForUpdateRequest: {
        token: token,
        matchingRequestId: matchingRequestId,
        receiverId: receiverId,
        senderId: senderId,
        status: status,
        notificationId: notificationId
      }
    });
  }

  async updateNotification(token, notificationId, ownerId, status) {
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

  async closeModal(didCloseFromCancel, dnaFileContent) {
    if ((!didCloseFromCancel && this.state.modalType === 'Approved') || (this.state.modalType === 'Read')) {
      const res = await updateMatchingRequestStatus(this.state.dataForUpdateRequest.token,
                                                    this.state.dataForUpdateRequest.matchingRequestId,
                                                    this.state.dataForUpdateRequest.receiverId,
                                                    this.state.dataForUpdateRequest.senderId,
                                                    this.state.dataForUpdateRequest.status);
      //update notification status for UI - owner in this case is always the receiver
      await updateNotificationStatus(this.state.dataForUpdateRequest.token,
                                     this.state.dataForUpdateRequest.notificationId,
                                     this.state.dataForUpdateRequest.receiverId,
                                     this.state.dataForUpdateRequest.status);
    }
    this.setState({
      modal: false,
      modalType: '',
      dataForUpdateRequest: {}
    });
    console.log("dna in notificationsPage: " + dnaFileContent);
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
          updateRequestStatus={this.updateRequestStatus}
          updateNotification={this.updateNotification}
        />
      </MDBContainer>
    )
  }

}

export default SPNotificationsPage;
