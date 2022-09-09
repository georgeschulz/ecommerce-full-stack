import Modal from "./modal";
import { toggleSettingsModal } from "../../features/wizardSlice";
import { useSelector } from "react-redux";
import { selectShowSettingsModal } from "../../features/wizardSlice";
import { useEffect, useState } from "react";
import { getAccountInfo } from "../../api/getAccountInfo";
import { useDispatch } from "react-redux";
import { updateAccountInfo } from "../../api/getAccountInfo";
import { getCities } from "../../api/schedule";
import { deauthorize } from "../../features/auth";
import { selectIsAuth } from "../../features/auth";

function SettingsModal() {
    const showModal = useSelector(selectShowSettingsModal);
    const isAuth = useSelector(selectIsAuth);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [squareFeet, setSquareFeet] = useState('');
    const [error, setError] = useState('');
    const [cityOptions, setCityOptions] = useState(['Error']);
    const dispatch = useDispatch();

    useEffect(() => {
        //load in the customer's contact information for them to update if they are authorized
        if(isAuth) {
            (async () => {
                try {
                    const response = await getAccountInfo();
                    const data = response.users[0];
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setPhone(data.phone);
                    setEmail(data.email);
                    setAddress(data.address);
                    setCity(data.city);
                    setState(data.state_abbreviation);
                    setZip(data.zip);
                    setSquareFeet(data.square_feet);
                } catch (e) {
                    console.log(e)
                    dispatch(deauthorize())
                }
            })();
        }
    }, [showModal]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getCities();
                setCityOptions(response.data)
            } catch (err) {
                console.log(err)
            }
        })();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(toggleSettingsModal());
        try {
            await updateAccountInfo({ firstName, lastName, phone, email, address, city, state, zip, squareFeet })
        } catch (e) {
            console.log(e)
        }
    }  

    return (
        <Modal toggleModal={toggleSettingsModal} show={showModal} title="Account Settings">
            <form className="update-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group-split form-group">
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
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="form-group form-group-split">
                    <div className="form-group-col">
                        <label htmlFor="city">City</label>
                        <select name="city" value={city} onChange={(e) => setCity(e.target.value)}>
                            {cityOptions.map((element, i) => {
                                return (<option key={i} value={element}>{element}</option>)
                            })}
                        </select>
                    </div>
                    <div className="form-group-col">
                        <label htmlFor="state">State</label>
                        <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="form-group-col">
                        <label htmlFor="zip">Zip Code</label>
                        <input type="text" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="squareFeet">Home Size in Square Feet</label>
                    <input type="text" name="squareFeet" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} />
                </div>
                <div className="button-row">
                    <button className="button-medium button-color-primary" type="submit">
                        Save
                    </button>
                </div>
                
            </form>
        </Modal>
    )
}

export default SettingsModal;