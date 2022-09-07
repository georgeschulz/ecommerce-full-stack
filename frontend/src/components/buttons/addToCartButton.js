import { Link } from "react-router-dom";
import { useEffect } from "react";
import { addToCart } from "../../features/cart";
import { addToCartApi } from "../../api/cart";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/auth";
import { useDispatch } from "react-redux";
import MediumButton from "./mediumButton";
import { updateMostRecentItem } from "../../features/cart";

function AddToCartButton({serviceId, target, show}) {
    const customerId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const handleClick = async () => {
        const response = await addToCartApi(serviceId, target, customerId);
        dispatch(updateMostRecentItem({mostRecentItem: "add-" + serviceId}))
    }
    
    return (
        <div onClick={() => handleClick()} className={show ? null : 'hidden'}>
            <MediumButton redirect={'/wizard/5'} level='primary'>
                Add to Cart
            </MediumButton>
        </div>
    )
}

export default AddToCartButton;