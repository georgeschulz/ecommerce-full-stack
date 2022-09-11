import MediumButton from "./mediumButton";
import { useEffect, useState } from "react";
import { getStripeLink } from "../../api/cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAppointmentDate } from "../../api/schedule";
import { selectMostRecentItem } from "../../features/cart";
import { selectIsCartEmtpy } from "../../features/cart";

function BookButton({date, routeId}) {
    const [link, setLink] = useState('/wizard/5');
    const [buttonText, setButtonText] = useState('loading...')
    const navigate = useNavigate();
    const cartChange = useSelector(selectMostRecentItem)
    const cartIsEmpty = useSelector(selectIsCartEmtpy);

    useEffect(() => {
        (async () => {
            if(cartIsEmpty) {
                navigate('/wizard/4')
            }
            setButtonText('loading...')
            const response = await getStripeLink(date);
            setLink(response.data)
            setButtonText('Book')
        })();
    }, [cartChange, cartIsEmpty, navigate, date])

    const handleClick = async () => {
        const response = await setAppointmentDate(routeId);
        if(response.status === 200) {
            window.location.href = link;
        } else {
            console.log('Error! Could not get add the availability.')
        }
        
    }

    return (
        <div onClick={() => handleClick()}>
            <MediumButton level='primary'>
                {buttonText}
            </MediumButton>
        </div>
    )
}

export default BookButton;