import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MediumButton from "./mediumButton";
import { setReferringServiceId } from "../../features/wizardSlice";

function GetQuoteButton({serviceId, show}) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setReferringServiceId({referringServiceId: serviceId}));
    }
    
    return (
        <div onClick={() => handleClick()} className={show ? null : 'hidden'}>
            <MediumButton redirect={'/wizard/1'} level='primary'>
                Get Pricing
            </MediumButton>
        </div>
    )
}

export default GetQuoteButton;