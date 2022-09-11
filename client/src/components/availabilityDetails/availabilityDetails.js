import './availabilityDetails.css';
import BookButton from '../buttons/bookButton';

function AvailabilityDetails({ routeId, routeDate, areaId, techId, slotsAvailabile, techFirstName, techLastName, techProfilePic, city }) {
    const date = new Date(routeDate)
    const dateString = date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div>
            <div className="availability-details-box hidden-tablet-and-below">
                <div className='availability-details-group'>
                    <p>{dateString} </p>
                </div>
                <div className="availability-details-group">
                    <p>{techFirstName} {techLastName}</p>
                    <img src={`/images/techs/${techProfilePic}`} className='tech-photo' alt="tech" />
                </div>
                <div className="availability-details-group">
                    <p className={slotsAvailabile <= 3 ? 'red' : 'green'}>{slotsAvailabile} Spots Remaining</p>
                </div>
                <div className="availability-details-group">
                    <BookButton date={date} routeId={routeId} />
                </div>
            </div>

            <div className='availability-details-box availability-details-box-mobile hidden-desktop'>
                <div className="availability-details-group">
                    <img src={`/images/techs/${techProfilePic}`} className='tech-photo' alt="tech" />
                </div>
                <div className='availability-details-group'>
                    <p>{techFirstName} {techLastName}</p>
                </div>
                <div className='availability-details-group'>
                    <b>{dateString}</b>
                </div>
                <div className='availabilty-badge'>
                    <p className={slotsAvailabile <= 3 ? 'red' : 'green'}>{slotsAvailabile} Spots Remaining</p>
                </div>
                <div className='availability-details-group' style={{'marginTop': '20px'}}>
                    <BookButton date={date} routeId={routeId} />
                </div>
                
            </div>
        </div>

    )
}

export default AvailabilityDetails;