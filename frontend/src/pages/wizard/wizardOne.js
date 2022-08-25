import Nav from "../../components/nav/nav";
import ProgressBar from "../../components/progressBar/progressBar";
import './wizard.css'
import MediumInfoBox from "../../components/mediumInfoBox/mediumInfoBox";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startWizardFlow } from "../../features/wizardSlice";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../features/auth";
import { useNavigate } from "react-router-dom";

function WizardOne() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        //signal that we are in the wizard flow so that redirects to next page in login works properly
        dispatch(startWizardFlow())

        //check to see if they are logged in already. If so, shoot them over to pest selection
        if(isAuth) {
            navigate('/wizard/2');
        }

    }, [])

    const loginButton = (
        <Link to="/login">
            <p className="button-medium button-color-primary">Login to your Account</p>
        </Link>
    );
    
    const signinButton = (
        <Link to="/signup">
            <p className="button-medium button-color-primary">Sign in to your Account</p>
        </Link>
    );

    return (
        <div className="wizard-container">
            <Nav
                homeNav="store"
                showSolution={true}
                showServices={true}
                showAccountSettings={true}
            />
            <div className="wizard-content-container">
                <h1 className="wizard-header">Step 1 / 5:  Create or Sign In To Your Account</h1>
                <ProgressBar percent="20" />
                <p>Please indicate whether you are a new or existing customer so that your quote can be customized for your home.</p>
            </div>
            <div id="medium-box-options-row">
                <MediumInfoBox button={loginButton}>
                    <h3>Current Customers</h3>
                    <p>Login to add a new service to your home’s account.</p>
                </MediumInfoBox>
                <MediumInfoBox button={signinButton}>
                    <h3>New Customers</h3>
                    <p>Create an account for a new home to get a custom plan and pricing.</p>
                </MediumInfoBox>
            </div>
            


        </div>
    )
}

export default WizardOne;