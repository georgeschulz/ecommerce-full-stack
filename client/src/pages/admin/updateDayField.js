import { useState } from "react";
import { setAvailability } from "../../api/admin";

function UpdateDayField({routeId, value}) {
    const [newValue, setNewValue] = useState(value);
    //set color
    let color;
    if(newValue <= 0) {
        color = '#FF6961';
    } else if (newValue <= 1) {
        color='#FFE080'
    } else if (newValue <= 2) {
        color='#E2FAB5'
    } else {
        color="#90EE90"
    }

    const handleChange = async (e) => {
        setNewValue(e.target.value);
        await setAvailability(e.target.value, routeId);
    }

    return (
        <input style={{"backgroundColor": color}} type="number" value={newValue} onChange={(e) => handleChange(e)} name="route-id" className="update-day-field" />
    )
}

export default UpdateDayField;