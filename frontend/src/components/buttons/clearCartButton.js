import MediumButton from "./mediumButton"
import { clearCart } from "../../api/cart";
import { useDispatch } from "react-redux";
import { updateMostRecentItem } from "../../features/cart";

function ClearCartButton() {
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            await clearCart();
            dispatch(updateMostRecentItem({mostRecentItem: 'clear-cart'}));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div onClick={() => handleClick()}>
            <MediumButton level="secondary">Clear Cart</MediumButton>
        </div>
    )
}

export default ClearCartButton;