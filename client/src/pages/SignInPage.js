import React from 'react';
import SignIn from "../components/SignIn/SignIn";
import {MDBContainer} from 'mdbreact';

class SignInPage extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {};    
    }

    render() {
    return(
        <div style={this.props.background}>
            <MDBContainer>
                <SignIn
                />
            </MDBContainer>
        </div>
    );
    }
}

export default SignInPage;