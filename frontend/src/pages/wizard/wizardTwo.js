import { selectUserId } from "../../features/auth";
import { getAccountInfo } from "../../api/getAccountInfo";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function WizardTwo() {
    const customerId = useSelector(selectUserId);

    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [stateAbbreviation, setStateAbbreviation] = useState('');
    const [squareFeet, setSquareFeet] = useState('');

    useEffect(() => {
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
        }
        
        fetchInfo()
    }, [])

    return (
        <div>
            <h2>Wizard 2</h2>
        </div>
    )
}

export default WizardTwo;