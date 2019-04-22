import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';

class SPNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read: false,
      senderUser: props.senderUser,
      requestStatus: props.requestStatus
    };
    this.markAsRead = this.markAsRead.bind(this);
    this.textFontByStatus = this.textFontByStatus.bind(this);
  }

  async markAsRead() {
    //TODO add POST method in notificationsAPI
    await updateNotificationStatus("read");
    this.setState({
      read: true
    });
  }

  textFontByStatus() {
    if (this.state.read === true) {
      return "font-weight-normal";
    } else {
      return "font-weight-bold"
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      senderUser: newProps.senderUser,
      requestStatus: newProps.requestStatus
    });
  }

  render() {
    return (
      <MDBContainer>
        <MDBCard >
          <MDBCardBody className={this.textFontByStatus()}> {this.state.senderUser} updated youre matching request status to {this.state.requestStatus} </MDBCardBody>
          <MDBBtn onClick={this.markAsRead()}> Mark As Read </MDBBtn>
        </MDBCard>
      </MDBContainer>
    );
  }
}

export default SPNotification;
