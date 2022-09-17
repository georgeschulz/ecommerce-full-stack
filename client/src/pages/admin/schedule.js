import { createRoute, getAvailability } from "../../api/admin";
import { useState, useEffect } from "react";
import './admin.css'

function SchedulePage() {
    const [newDate, setNewDate] = useState(null);
    const [availability, setAvailability] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAvailability();
                console.log(response)
                setAvailability(response.data)

            } catch (err) {
                console.log(err)
            }
        })();
    }, [])

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
            {availability ?
                <table className="availability-table">
                    <tr>
                        <td><b>Days Available</b></td>
                        {availability.techs.map(tech => {
                            return (
                                <td><b>{tech.tech_first_name} {tech.tech_last_name} (id: {tech.tech_id})</b></td>
                            )
                        })}
                    </tr>


                    {availability.avaiabilityTable.map((row, i) => {
                        const slots = availability.avaiabilityTable[i].slice(1, availability.length)
                        return (<tr>
                            <td>{new Date(row[0]).toLocaleDateString()}</td>
                            {slots != null
                                ? slots.map(slot => { return (<td>{slot ? slot.slots_available : 'none'}</td>) })
                                : <td>None</td>
                            }
                        </tr>)
                    })}
                </table>
                : <p style={{ 'color': 'red' }}>Error Loading Table</p>}
            <div className="add-date">
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}></input>
                <p className="button-medium button-color-primary" onClick={() => handleClick()}>Create Day</p>
            </div>
        </div>
    )
}

export default SchedulePage;