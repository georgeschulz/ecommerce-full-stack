import React from "react";
import Nav from "../components/nav/nav";
import LoginForm from "../components/loginForm/loginForm";
import logo from '../assets/better-logo.jpeg';

function Login() {
    return (
        <div>
            <div className="row row-center">
                <img className="hidden-tablet-and-below" src={logo} />
            </div>
            <LoginForm />
        </div>
        
    )
}

export default Login;
