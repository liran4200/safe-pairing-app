import React from 'react';
import SignIn from "../components/SignIn";
import {MDBContainer} from 'mdbreact';

const SignInPage = () =>  {
    return(
        <div>
            <MDBContainer>
                <SignIn/>
            </MDBContainer>
        </div>
    );
}

export default SignInPage;