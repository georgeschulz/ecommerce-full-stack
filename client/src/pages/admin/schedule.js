import { createRoute, getAvailability } from "../../api/admin";
import { useState, useEffect } from "react";
import UpdateDayField from "./updateDayField";
import './admin.css'

function SchedulePage() {
    const [newDate, setNewDate] = useState(null);
    const [availability, setAvailability] = useState(null);
    const [rerender, setRerender] = useState(0); //use this hook to force component to rerender when new routes are made
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


    useEffect(() => {
        (async () => {
            try {
                const response = await getAvailability();
                setAvailability(response.data)

            } catch (err) {
                console.log(err)
            }
        })();
    }, [rerender])

    const handleClick = async () => {
        try {
            await createRoute(newDate);
            setRerender(rerender + 1);
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <div className="main-container">
            <h1>Schedule</h1>
            {availability ?
                <table className="availability-table">
                    <tr>
                        <td><b>Days Available</b></td>
                        {availability.techs.map(tech => {
                            return (
                                <td style={{"textAlign": "center"}}><b>{tech.tech_first_name} {tech.tech_last_name}</b></td>
                            )
                        })}
                    </tr>


                    {availability.avaiabilityTable.map((row, i) => {
                        const slots = availability.avaiabilityTable[i].slice(1, availability.length)
                        return (<tr>
                            <td>{days[new Date(row[0]).getDay()]}, {new Date(row[0]).toLocaleDateString()}</td>
                            {slots != null
                                ? slots.map(slot => { return (<td>{<UpdateDayField routeId={slot.route_id} value={slot.slots_available} />}</td>) })
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