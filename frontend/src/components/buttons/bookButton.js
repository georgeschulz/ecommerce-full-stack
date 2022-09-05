import MediumButton from "./mediumButton";
import { useEffect, useState } from "react";
import { getStripeLink } from "../../api/cart";
import { useNavigate } from "react-router-dom";
import { selectUserId } from "../../features/auth";
import { useSelector } from "react-redux";
import { setAppointmentDate } from "../../api/schedule";
import { selectMostRecentItem } from "../../features/cart";

function BookButton({date, routeId}) {
    const [link, setLink] = useState('/wizard/5');
    const navigate = useNavigate();
    const userId = useSelector(selectUserId);
    const cartChange = useSelector(selectMostRecentItem)

    useEffect(() => {
        (async () => {
            const response = await getStripeLink(userId, date);
            setLink(response.data)
        })();
    }, [cartChange])

    const handleClick = async () => {
        const response = await setAppointmentDate(routeId, userId);
        if(response.status === 200) {
            window.location.href = link;
        } else {
            console.log('Error! Could not get add the availability.')
        }
        
    }

    return (
        <div onClick={() => handleClick()}>
            <MediumButton redirect={null} level='primary'>
                Book
            </MediumButton>
        </div>
    )
}

export default BookButton;