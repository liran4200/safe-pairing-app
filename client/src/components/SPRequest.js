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
    this.dateAsString = this.dateAsString.bind(this);
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
      case "Pending":
        return "warning-color";
      case "Read":
        return "info-color";
      case "Approved":
        return "success-color";
    }
  }

  dateAsString(date) {
    const myDate = new Date(date);
    return `${myDate.getDate()}-${myDate.getMonth()}-${myDate.getFullYear()}, ${myDate.getHours()}:${myDate.getMinutes()}`
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
        <MDBCardFooter color={this.cardColorByStatus(this.props.status)}>{this.dateAsString(this.props.createdDate)}</MDBCardFooter>
      </MDBCard>
    );
  }


}

export default SPRequest;
