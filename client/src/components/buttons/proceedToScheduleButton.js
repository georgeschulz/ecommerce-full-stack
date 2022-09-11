import MediumButton from "./mediumButton";
import { useDispatch } from "react-redux";
import { toggleCartModal } from "../../features/cart";

function ProceedToScheduleButton() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(toggleCartModal());
    }

    return (
        <div onClick={() => handleClick()}>
            <MediumButton level="primary" redirect='/wizard/5'>
                Schedule Now
            </MediumButton>
        </div>
    )
}

export default ProceedToScheduleButton;