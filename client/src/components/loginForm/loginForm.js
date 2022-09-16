import React, { useState } from "react";
import './loginForm.css';
import { useDispatch } from "react-redux";
import { authorize, setUserId } from '../../features/auth';
import { onLogin } from '../../api/login';


function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await onLogin({username, password});
            const customerId = response.data.id;
            dispatch(setUserId({userId: customerId}));
            dispatch(authorize());
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('userId', customerId);
        } catch (err) {
            setError(err.response.data);
        }
    }

    const handleGoogleButtonClick = () => {
        (async () => {
            try {
                if(process.env.NODE_ENV === 'production') {
                    dispatch(authorize());
                    window.location.href = 'https://pest-control-ecommerce.herokuapp.com/login/google';
                } else {
                    dispatch(authorize());
                    window.location.href = 'http://localhost:4000/login/google';
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }

    return (
        <div id="login-form-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <p style={{color: 'red'}}>{error}</p>
                <div className="form-group row-center">
                    <a className="button-medium button-color-primary" onClick={() => handleGoogleButtonClick()}>Login with Google</a>
                    <button type="submit" className="submit-button">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;