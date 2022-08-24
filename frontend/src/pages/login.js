import React from "react";
import Nav from "../components/nav/nav";
import LoginForm from "../components/loginForm/loginForm";
import logo from '../assets/better-logo.jpeg';

function Login(props) {
    return (
        <div>
            <Nav
                homeNav="store" 
                showSolution={false}
                showServices={false}
                showAccountSettings={true}
                user={props.user}
            />
            <div className="row row-center">
                <img src={logo} />
            </div>
            <LoginForm />
        </div>
        
    )
}

export default Login;
