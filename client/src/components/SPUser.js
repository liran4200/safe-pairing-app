import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn, MDBContainer } from
"mdbreact";

const SPUser = props => {
  return (
    <MDBCard style={{ marginTop: "1rem"}} className="text-center w-75 mx-auto">
      <MDBCardHeader color="danger-color">{props.firstName + " " + props.lastName}</MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>{props.email}</MDBCardTitle>
        <MDBBtn color="red accent-2" size="lg" onClick={props.sendRequest}>
          Send Matching Request
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SPUser;
