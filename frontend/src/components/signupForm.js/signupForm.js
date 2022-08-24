import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authorize } from "../../features/auth";
import MultipaneForm from "../multipaneForm/multipaneForm";
import './signupForm.css'
import { onSignup } from "../../api/signup";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [squareFeet, setSquareFeet] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSignup({firstName, lastName, address, city, state, zip, email, phone, password, squareFeet})
            navigate('/login');
        } catch (err) {
            setError(error.message);
        }
    }

    const pageOne = (
        <div id="pageOne">
            <div className="form-group form-group-split">
                <div className="form-group-col">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group-col">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />    
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
    );

    const pageTwo = (
        <div id="pageTwo">
            <div className="form-group">
                <label for="address">Address</label>
                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="form-group form-group-split">
                <div className="form-group-col">
                    <label for="city">City</label>
                    <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="form-group-col">
                    <label for="state">State</label>
                    <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="form-group-col">
                    <label for="zip">Zip Code</label>
                    <input type="text" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
                </div>
            </div>
            <div className="form-group">
                <label for="squareFeet">Home Size in Square Feet</label>
                <input type="text" name="squareFeet" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} />
            </div> 
        </div>
    )
    const submit = <button type="submit" className="button-medium button-color-primary">Submit</button>

    return (
        <form id="signup-form" onSubmit={handleSubmit}>
            <MultipaneForm
                title='Signup Form'
                panes={[pageOne, pageTwo]}
                submit={submit}
            />
        </form>
    )
    
}

export default SignupForm;