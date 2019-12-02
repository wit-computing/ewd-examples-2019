import React from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import * as api from './api';
//import Auth from './auth';
import {
    BrowserRouter
} from 'react-router-dom';


const LoginPage = (props) => {
    const signupWasClickedCallback = async (data) => {
        try {
            if (data.password !== data.passwordConfirmation) Error('Passwords do not match!');
            await api.signup(data.username, data.password);
            BrowserRouter.push('/');
        } catch (e) {
            alert(`Signup Failed ${e}`)
        }
    };
    const loginWasClickedCallback = async function (data) {
        try {
            const result = await api.login(data.username, data.password);
            //Auth.authenticateUser(result.token);
            BrowserRouter.push('/');

        } catch (e) {
            alert(`SAuthentication Failed: ${e}`)
        }

    };

    return ( <
        div >
        <
        ReactSignupLoginComponent title = " "
       // handleSignup = {
         //   signupWasClickedCallback
     //   }
        handleLogin = {
            loginWasClickedCallback
        }
        /> <
        /div>
    );
};

export default LoginPage;