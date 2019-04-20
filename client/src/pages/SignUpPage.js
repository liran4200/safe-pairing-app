import React from 'react';
import SignUp from "../components/SignUp/SignUp";
import {MDBContainer} from 'mdbreact';

const SignUpPage = () =>  {
    return(
        <div className="jumbotron">
            <MDBContainer>
                <SignUp/>
            </MDBContainer>
        </div>
    );
}

export default SignUpPage;