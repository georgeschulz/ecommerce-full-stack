import { selectUserId } from "../../features/auth";
import { getAccountInfo } from "../../api/getAccountInfo";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import WizardTemplate from "./wizardTemplate";
import { Link } from "react-router-dom";
import { selectSelectedPest } from "../../features/wizardSlice";
import { toggleSettingsModal } from "../../features/wizardSlice";
import { selectShowSettingsModal } from "../../features/wizardSlice";

//wizard two confirms the address information which is necessary for a proper calculation of a quote
function WizardTwo() {
    //get the user's id from redux (maps to customer Id in the customer table)
    const customerId = useSelector(selectUserId);
    const skipPest = useSelector(selectSelectedPest);
    const showModal = useSelector(selectShowSettingsModal)
    const dispatch = useDispatch()

    //create the state information to store the results of the fetch request
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [stateAbbreviation, setStateAbbreviation] = useState('');
    const [squareFeet, setSquareFeet] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    //get the user's information based on the data stored in redux
    useEffect(() => {
        //naming an async request here because useEffect can not be passed an async fxn - that would force it to return a promise, whereas it requires a cleanup fxn to return
        const fetchInfo = async () => {
            const response = await getAccountInfo(customerId);
            const data = response.users[0];
            setfirstName(data.first_name);
            setLastName(data.last_name);
            setAddress(data.address);
            setCity(data.city);
            setZip(data.zip);
            setStateAbbreviation(data.state_abbreviation);
            setSquareFeet(data.square_feet);
            setEmail(data.email);
            setPhone(data.phone);
        }

        fetchInfo()
    }, [showModal]);

    //define the body that will present the user's information

    const mainContent = (
        <div className="large-box-container">
            <div className="large-box">
                <div className="large-box-group">
                    <p><b>Name: </b>{firstName} {lastName}</p>
                    <p><b>Email: </b>{email}</p>
                    <p><b>Phone: </b> {phone}</p>
                </div>
                <div className="large-box-group">
                    <p><b>Address:</b> {address} {city}, {stateAbbreviation} {zip}</p>
                    <p><b>Square Feet: </b> {squareFeet}</p>
                </div>
            </div>
        </div>

    );

    return (
        <WizardTemplate
            num='1'
            maxNum='5'
            headline='Please confirm your contact and home information'
            percent='20'
            instructions='Please double check this information we have on record for you. An accurate estimate requires the specific address of your home and the size of the home.'
            body={
                <div className="large-box-container">
                    <div className="large-box">
                        <h3>Your Account Information</h3>
                        <div className="large-box-group">
                            <p><b>Name: </b>{firstName} {lastName}</p>
                            <p><b>Email: </b>{email}</p>
                            <p><b>Phone: </b> {phone}</p>
                        </div>
                        <div className="large-box-group">
                            <p><b>Address:</b> {address} {city}, {stateAbbreviation} {zip}</p>
                            <p><b>Square Feet: </b> {squareFeet}</p>
                        </div>
                    </div>
                    <div className="multipane-button-container" style={{'width': '100%'}}>
                        <p onClick={() => dispatch(toggleSettingsModal())} className="button-medium button-color-secondary">Update</p>
                        <Link to={skipPest ? '/wizard/4' : '/wizard/3'}><p className="button-medium button-color-primary">Continue</p></Link>
                    </div>
                </div>
            }
        />
    )
}

export default WizardTwo;