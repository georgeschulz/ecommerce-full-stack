import { addToCartApi } from "../../api/cart";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/auth";
import { useDispatch } from "react-redux";
import MediumButton from "./mediumButton";
import { updateMostRecentItem } from "../../features/cart";
import { useNavigate } from "react-router-dom";

function AddToCartButton({serviceId, target, show}) {
    const customerId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        await addToCartApi(serviceId, target, customerId);
        dispatch(updateMostRecentItem({mostRecentItem: "add-" + serviceId}));
        navigate('/wizard/5');
    }
    
    return (
        <div onClick={() => handleClick()} className={show ? null : 'hidden'}>
            <MediumButton level='primary'>
                Add to Cart
            </MediumButton>
        </div>
    )
}

export default AddToCartButton;