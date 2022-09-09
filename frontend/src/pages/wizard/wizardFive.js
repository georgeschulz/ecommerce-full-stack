import WizardTemplate from "./wizardTemplate";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/auth";
import { useEffect, useState } from "react";
import { getAvailability } from "../../api/schedule";
import AvailabilityDetails from "../../components/availabilityDetails/availabilityDetails";

function WizardFive() {
    const customerId = useSelector(selectUserId);
    const [availability, setAvailabilty] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAvailability();
                setAvailabilty(response.data);
            } catch (err) {
                console.log(err)
             }        
        })();
    }, [])

    const availabilityContent = availability.length === 0 ? 'Sorry. It looks like we are all booked up for now. Please give our office a call at 703-111-1111 to join our waitlist.' : availability.map((slot, i) => {
        return (
            <AvailabilityDetails
                key={slot.route_id}
                routeId={slot.route_id}
                routeDate={slot.route_date}
                areaId={slot.area_id}
                techId={slot.tech_id}
                slotsAvailabile={slot.slots_available}
                techFirstName={slot.tech_first_name}
                techLastName={slot.tech_last_name}
                techProfilePic={slot.tech_profile_pic}
                city={slot.city}
            />
        )
    })

    return (
        <WizardTemplate
            num='4'
            maxNum='5'
            percent='80'
            headline='Select Your Date'
            instruction='Please choose the date for your next service based on the days, we’ll have a technician in your area. Your technician will provide you with a two hour time window the morning of your service.'
            body={<div className="availabilty-container">{availabilityContent}</div>}
        />
    )
}

export default WizardFive;