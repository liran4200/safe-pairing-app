import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import SPNotificationsList from '../components/SPNotificationsList.js';
import { getNotifications } from '../serverCalls/NotificationAPI.js';
import { updateMatchingRequestStatus } from '../serverCalls/matchingRequestAPI.js';
import { updateNotificationStatus } from '../serverCalls/NotificationAPI.js';
import SPupdateMatchingRequestStatusModal from '../components/SPUpdateMatchingRequestStatusModal.js'
import eosio from '../utils/eosioClient.js'


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
    console.log(this.props.currentUser);
    const res = await getNotifications(localStorage.getItem('token'), this.props.currentUser._id);
    console.log(res);
    this.setState({
      notifications: res
    });
  }

  updateRequestStatus(matchingRequestId, receiverId, senderId, status, notificationId) {
    this.setState({
      modal: true,
      modalType: status,
      dataForUpdateRequest: {
        token: localStorage.getItem('token'),
        matchingRequestId: matchingRequestId,
        receiverId: receiverId,
        senderId: senderId,
        status: status,
        notificationId: notificationId
      }
    });
  }

  async updateNotification(notificationId, ownerId, status) {
    const res = await updateNotificationStatus(localStorage.getItem('token'), notificationId, ownerId, status);
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

  async closeModal(didCloseFromCancel, dnaFileContent, userKey) {
    const notificationsToUpdate = this.state.notifications;
    if ((!didCloseFromCancel && this.state.modalType == 'Approved') || (this.state.modalType == 'Read')) {
      if (dnaFileContent.trim().length !== 0) {
        console.log("dna in serchUserPage: " + dnaFileContent);
        let eos = new eosio(userKey);
        let result = await eos.transaction('spacc',
                                        this.props.currentUser.eosAcc,
                                        'upsert',
                                        {
                                          user: this.props.currentUser.eosAcc,
                                          dna: dnaFileContent
                                        });
        console.log(result);
        eos = null;
      }
      const res = await updateMatchingRequestStatus(this.state.dataForUpdateRequest.token,
                                                    this.state.dataForUpdateRequest.matchingRequestId,
                                                    this.state.dataForUpdateRequest.receiverId,
                                                    this.state.dataForUpdateRequest.senderId,
                                                    this.state.dataForUpdateRequest.status);
      //update notification status for UI - owner in this case is always the receiver
      const updatedNotification = await updateNotificationStatus(this.state.dataForUpdateRequest.token,
                                     this.state.dataForUpdateRequest.notificationId,
                                     this.state.dataForUpdateRequest.receiverId,
                                     this.state.dataForUpdateRequest.status);

      for (var i in notificationsToUpdate) {
        if (notificationsToUpdate[i].notificationId == updatedNotification.notificationId) {
          notificationsToUpdate[i].status = updatedNotification.status;
          break;
        }
      }

    }
    this.setState({
      modal: false,
      modalType: '',
      dataForUpdateRequest: {},
      notifications: notificationsToUpdate
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
