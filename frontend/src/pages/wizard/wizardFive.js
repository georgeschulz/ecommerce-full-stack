import WizardTemplate from "./wizardTemplate";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/auth";
import { useEffect, useState } from "react";
import { getAvailability } from "../../api/schedule";

function WizardFive() {
    const customerId = useSelector(selectUserId);
    const [availability, setAvailabilty] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAvailability(customerId);
                setAvailabilty(response.data);
            } catch (err) {
                console.log(err)
            }        
        })();
    }, [])


    return (
        <WizardTemplate
            num='4'
            maxNum='5'
            percent='80'
            headline='Select Your Date'
            instruction='Please choose the date for your next service based on the days, we’ll have a technician in your area. Your technician will provide you with a two hour time window the morning of your service.'
            body={'test'}
        />
    )
}

export default WizardFive;