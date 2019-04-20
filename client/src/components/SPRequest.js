import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn, MDBContainer } from
"mdbreact";

class  SPRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    }
    this.cardColorByStatus = this.cardColorByStatus.bind(this);
  }

  componentDidMount() {
    this.setState({
      status: this.props.status
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.status
    });
  }

  cardColorByStatus(status) {
    switch (status) {
      case "pending":
        return "warning-color";
      case "read":
        return "info-color";
      case "approved":
        return "success-color";
    }
  }

  render() {
    return (
      <MDBCard style={{ width: "22rem", margin: "1rem" }} className="text-center">
        <MDBCardHeader color={this.cardColorByStatus(this.props.status)}>{this.props.status}</MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle>{this.props.matchingUser}</MDBCardTitle>
          <MDBCardText>
            --
          </MDBCardText>
          </MDBCardBody>
        <MDBCardFooter color={this.cardColorByStatus(this.props.status)}>2 days ago</MDBCardFooter>
      </MDBCard>
    );
  }


}

export default SPRequest;
