import { createRoute } from "../../api/admin";
import { useState } from "react";

function SchedulePage () {
    const [newDate, setNewDate] = useState(null);

    const handleClick = async () => {
        try {
            await createRoute(newDate);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Schedule</h1>
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}></input>
            <p className="button-medium button-color-primary" onClick={() => handleClick()}>Create Day</p>
        </div>
    )
}

export default SchedulePage;