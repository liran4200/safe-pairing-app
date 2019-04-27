import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';
import { updateNotificationStatus } from '../serverCalls/NotificationAPI';
import SPUpdateNotificationStatusModal from './SPUpdateNotificationStatusModal.js';

const SPNotification = (props) => {
  if (props.requestStatus === 'pending') {
    return(
      <MDBContainer>
        <MDBCard border="info" style={{ marginTop: "1rem"}} className="text-center w-75 mx-auto">
          <MDBCardBody> {props.senderUser} sent you a matching request </MDBCardBody>
          <MDBBtn color="primary" onClick={props.markAsRead}> Mark As Read </MDBBtn>
          <MDBBtn color="primary" onClick={props.approveMatchingRequest}> approve matching request </MDBBtn>
        </MDBCard>
      </MDBContainer>
    );
  } else {
    return(
      <MDBContainer>
        <MDBCard border="info" style={{ marginTop: "1rem"}} className="text-center w-75 mx-auto">
          <MDBCardBody> {props.receiverUser} updated your matching request status to - "{props.requestStatus}" </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  }
}

export default SPNotification;
