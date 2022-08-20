import React from "react";
import Nav from "../components/nav/nav";

function Login(props) {
    return (
        <Nav
            homeNav="store" 
            showSolution={false}
            showServices={false}
            showAccountSettings={false}
            user={props.user}
        />
    )
}

export default Login;