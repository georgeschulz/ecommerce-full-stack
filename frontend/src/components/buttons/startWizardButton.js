import { startWizardFlow } from "../../features/wizardSlice";
import { useDispatch } from "react-redux";
import { setReferringServiceId } from "../../features/wizardSlice";
import { useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../features/auth";
import { useSelector } from "react-redux";
import LargeButton from "./largeButton";

function StartWizardButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const handleClick = () => {
        dispatch(setReferringServiceId({ referringServiceId: null }));
        dispatch(startWizardFlow())
        navigate(isAuth ? '/wizard/2' : '/wizard/1')
    }

    return (
        <LargeButton level="primary" onClick={handleClick}>
            Get My Quote
        </LargeButton>
    )
}

export default StartWizardButton;