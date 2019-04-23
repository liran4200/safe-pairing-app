import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';

class SPNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read: false,
    };
    this.markAsRead = this.markAsRead.bind(this);
    this.textFontByStatus = this.textFontByStatus.bind(this);
    this.approveMatchingRequest = this.approveMatchingRequest.bind(this);
  }

  async markAsRead() {
    if (this.props.notificationType === 'notify') {
        const res = await updateNotificationStatus('aaa', this.props.notificationId, '5cb6c2f7262b2c2779d0da13', this.props.otherUserId, 'read');
    }
    this.setState({
      read: true
    });
  }

  async approveMatchingRequest() {
    const res = await updateNotificationStatus('aaa', this.props.notificationId, '5cb6c2f7262b2c2779d0da13', this.props.otherUserId, 'approve');
    this.setState({
      read: true
    });
  }

  textFontByStatus() {
    if (this.state.read === true) {
      return "font-weight-light";
    } else {
      return "font-weight-bold";
    }
  }

  render() {
    if (this.props.notificationType === 'notify') {
      return (
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className={this.textFontByStatus()}> {this.props.senderUser} updated your matching request status to {this.props.requestStatus} </MDBCardBody>
            <MDBBtn onClick={this.markAsRead()}> Mark As Read </MDBBtn>
          </MDBCard>
        </MDBContainer>
      );
    } else {
      return (
        <MDBContainer>
          <MDBCard>
            <MDBCardBody className={this.textFontByStatus()}> {this.props.senderUser} sent you a matching request </MDBCardBody>
            <MDBBtn onClick={this.markAsRead()}> Mark As Read </MDBBtn>
            <MDBBtn onClick={this.approveMatchingRequest()}> approve matching request </MDBBtn>
          </MDBCard>
        </MDBContainer>
      );
    }
  }
}

export default SPNotification;
