import React from 'react';
import SignIn from "../components/SignIn/SignIn";
import {MDBContainer} from 'mdbreact';

const SignInPage = () =>  {
    return(
        <div className="jumbotron">
            <MDBContainer>
                <SignIn/>
            </MDBContainer>
        </div>
    );
}

export default SignInPage;