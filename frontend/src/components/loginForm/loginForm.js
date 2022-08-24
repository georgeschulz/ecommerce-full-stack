import React, { useState } from "react";
import './loginForm.css';
import { useDispatch } from "react-redux";
import { authorize } from '../../features/auth';
import { onLogin } from '../../api/login';


function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onLogin({username, password});
            console.log('authorized right!')
            dispatch(authorize());
            localStorage.setItem('isAuth', 'true');
        } catch (err) {
            setError(err.message);
        }
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
                    <button type="submit" className="submit-button">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;