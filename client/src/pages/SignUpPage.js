import React from 'react';
import SignUp from "../components/SignUp";
import {MDBContainer} from 'mdbreact';

const SignUpPage = () =>  {
    return(
        <div>
            <MDBContainer>
                <SignUp/>
            </MDBContainer>
        </div>
    );
}

export default SignUpPage;