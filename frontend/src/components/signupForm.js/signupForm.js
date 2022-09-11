import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authorize } from "../../features/auth";
import MultipaneForm from "../multipaneForm/multipaneForm";
import './signupForm.css'
import { onSignup } from "../../api/signup";
import { useNavigate } from "react-router-dom";
import { getCities } from "../../api/schedule";

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('Alexandria');
    const [state, setState] = useState('VA');
    const [zip, setZip] = useState('');
    const [squareFeet, setSquareFeet] = useState(0);
    const [error, setError] = useState('');
    const [cityOptions, setCityOptions] = useState(['']);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSignup({ firstName, lastName, address, city, state, zip, email, phone, password, squareFeet })
            navigate('/login');
        } catch (err) {
            alert(err.response.data)
            console.log(err.response.data)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await getCities();
                setCityOptions(response.data);
            } catch (err) {
                console.log(err)
            }
        })();
    }, [])

    return (
        <div>
            <h2>Signup</h2>
            <div className="signup-form-container">
                <form id="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group form-group-split">
                        <div className="form-group-col">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength="50" minLength="1" required />
                        </div>
                        <div className="form-group-col">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength="50" minLength="1" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label> (ex. 101-111-1111)
                        <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label> (your password must be between 7 and 20 characters)
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="7" maxLength="20" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input minLength="5" maxLength="100" type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="form-group form-group-split">
                        <div className="form-group-col">
                            <label htmlFor="city">City</label>
                            <select name="city" value={city} onChange={(e) => setCity(e.target.value)} required>
                                {cityOptions.map(element => {
                                    return (<option value={element}>{element}</option>)
                                })}
                            </select>
                        </div>
                        <div className="form-group-col">
                            <label htmlFor="state">State</label>
                            <select name="state" value={state} onChange={(e) => setState(e.target.value)} required>
                                <option value="DC">Washington DC</option>
                                <option value="VA">Virginia</option>
                                <option value="MD">Maryland</option>
                            </select>
                        </div>
                        <div className="form-group-col">
                            <label htmlFor="zip">Zip Code</label> (5 Digits)
                            <input type="text" minLength="5" maxLength="5" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="squareFeet">Home Size in Square Feet</label>
                        <input type="number" min="100" max="30000" name="squareFeet" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} required />
                    </div>
                    <button type="submit" className="button-medium button-color-primary">Submit</button>
                </form>
            </div>
        </div>
    )

}

export default SignupForm;