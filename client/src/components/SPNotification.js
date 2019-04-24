import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';
import { updateNotificationStatus } from '../serverCalls/NotificationAPI';

const SPNotification = (props) => {
  const markAsRead = async () => {
      const res = await updateNotificationStatus('aaa', props.notificationId, '5cb6c2f7262b2c2779d0da13', props.senderId, 'read');
  }

  const approveMatchingRequest = async () => {
    const res = await updateNotificationStatus('aaa', props.notificationId, '5cb6c2f7262b2c2779d0da13', props.senderId, 'approved');
  }

  if (props.requestStatus === 'pending') {
    return(
      <MDBContainer>
        <MDBCard style={{ marginTop: "1rem"}} className="text-center w-75 mx-auto">
          <MDBCardBody> {props.senderUser} sent you a matching request </MDBCardBody>
          <MDBBtn onClick={() => markAsRead()}> Mark As Read </MDBBtn>
          <MDBBtn onClick={() => approveMatchingRequest()}> approve matching request </MDBBtn>
        </MDBCard>
      </MDBContainer>
    );
  } else {
    return(
      <MDBContainer>
        <MDBCard style={{ marginTop: "1rem"}} className="text-center w-75 mx-auto">
          <MDBCardBody> {props.receiverUser} updated your matching request status to - "{props.requestStatus}" </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  }


}

export default SPNotification;
