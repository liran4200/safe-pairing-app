import React from 'react';
import SignIn from "../components/SignIn";
import {MDBContainer} from 'mdbreact';

class SignInPage extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {};    
    }

    render() {
    return(
        <div>
            <MDBContainer>
                <SignIn onLoggedIn={this.props.onLoggedIn}
                />
            </MDBContainer>
        </div>
    );
    }
}

export default SignInPage;