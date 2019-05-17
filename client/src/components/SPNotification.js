import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn , MDBCardText, MDBCardFooter } from 'mdbreact';
import { updateMatchingRequestStatus } from '../serverCalls/NotificationAPI';
import SPUpdateMatchingRequestStatusModal from './SPUpdateMatchingRequestStatusModal.js';

class SPNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.notificationStatus
    }
    this.calculateTextStyleForStatus = this.calculateTextStyleForStatus.bind(this);
    this.calculateBorderColorForStatus = this.calculateBorderColorForStatus.bind(this);
    this.dateAsString = this.dateAsString.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props != newProps) {
      this.setState({
        status: newProps.notificationStatus
      });
    }
  }

  calculateTextStyleForStatus(status) {
    if (status === 'Read' || status === 'Approved') {
      return "font-weight-light"
    } else if (status === 'new') {
      return "font-weight-bold"
    }
  }

  calculateBorderColorForStatus() {
    if (this.state.status === 'new') {
      return "blue lighten-4"
    } else {
      return ""
    }
  }

  dateAsString(date) {
    const myDate = new Date(date);
    return `${myDate.getDate()}-${myDate.getMonth()}-${myDate.getFullYear()}, ${myDate.getHours()}:${myDate.getMinutes()}`
  }

  render() {
    const otherUser = this.props.ownerId === this.props.receiverUser._id ? `${this.props.senderUser.firstName} ${this.props.senderUser.lastName}` : `${this.props.receiverUser.firstName} ${this.props.receiverUser.lastName}`

    if (this.props.type === 'new-matching-notification') {
        return(
          <MDBContainer>
            <MDBCard color={this.calculateBorderColorForStatus()} border="info" style={{ marginTop: "1rem"}} className="text-center w-75 mx-auto">
              <MDBCardBody className={this.calculateTextStyleForStatus(this.state.status)}> {otherUser} sent you a matching request </MDBCardBody>
              {this.state.status === 'new' ? (<MDBBtn color="primary" onClick={this.props.markAsRead}> Mark As Read </MDBBtn>) : null}
              {this.state.status === 'Approved' ? (<MDBCardText className='font-weight-light' style={{paddingBottom: "2rem"}}> Matching approved </MDBCardText>)
                                           : (<MDBBtn color="primary" onClick={this.props.approveMatchingRequest}> approve matching request </MDBBtn>)}
             <MDBCardFooter>{this.dateAsString(this.props.updateDate)}</MDBCardFooter>
            </MDBCard>
          </MDBContainer>
        );
    } else if (this.props.type === 'update-matching-notification') {
      return(
        <MDBContainer>
          <MDBCard color={this.calculateBorderColorForStatus()} border="info" style={{ marginTop: "1rem"}} className="text-center w-75 mx-auto">
            <MDBCardBody className={this.calculateTextStyleForStatus(this.state.status)}> {otherUser} updated your matching request status to - "{this.props.requestStatus}" </MDBCardBody>
            {this.state.status === 'new' ? (<MDBBtn color="primary" onClick={this.props.markNotificationAsRead}> Mark As Read </MDBBtn>) : null}
            <MDBCardFooter>{this.dateAsString(this.props.updateDate)}</MDBCardFooter>
          </MDBCard>
        </MDBContainer>
      );
    }
  }
}

export default SPNotification;
