import MediumButton from "./mediumButton";
import { useEffect, useState } from "react";
import { getStripeLink } from "../../api/cart";
import { useNavigate } from "react-router-dom";
import { selectUserId } from "../../features/auth";
import { useSelector } from "react-redux";

function BookButton({date}) {
    const [link, setLink] = useState('/');
    const navigate = useNavigate();
    const userId = useSelector(selectUserId);

    useEffect(() => {
        (async () => {
            const response = await getStripeLink(userId, date);
            setLink(response.data)
        })();
    }, [])

    const handleClick = () => {
        window.location.href = link;
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