import './availabilityDetails.css';
import BookButton from '../buttons/bookButton';

function AvailabilityDetails({routeId, routeDate, areaId, techId, slotsAvailabile, techFirstName, techLastName, techProfilePic, city}) {
    const date = new Date(routeDate)
    const dateString = date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});

    return (
        <div className="availability-details-box">
            <div className='availability-details-group'>
                <p>{dateString} </p>
            </div>
            <div className="availability-details-group">
                <p>{techFirstName} {techLastName}</p>
                <img src={`/images/techs/${techProfilePic}`} className='tech-photo' />
            </div>
            <div className="availability-details-group">
                <p className={slotsAvailabile <= 3 ? 'red' : 'green'}>{slotsAvailabile} Spots Remaining</p>
            </div>
            <div className="availability-details-group">
                <BookButton date={date} />
            </div>
        </div>
    )
}

export default AvailabilityDetails;