import React from 'react';
import SignUp from "../components/SignUp/SignUp";
import {MDBContainer} from 'mdbreact';

const SignUpPage = (props) =>  {
    return(
        <div style={props.background}>
         <MDBContainer >
            <SignUp/>
        </MDBContainer>
        </div>
    );
}

export default SignUpPage;