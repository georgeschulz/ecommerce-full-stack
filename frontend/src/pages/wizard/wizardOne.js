import Nav from "../../components/nav/nav";
import ProgressBar from "../../components/progressBar/progressBar";
import './wizard.css'
import MediumInfoBox from "../../components/mediumInfoBox/mediumInfoBox";
import { Link } from "react-router-dom";

function WizardOne() {
    const loginButton = (
        <Link to="/login">
            <p className="button-medium button-color-primary">Login to your Account</p>
        </Link>
    );
    
    const signinButton = (
        <Link to="/signup">
            <p className="button-medium button-color-primary">Sign in to your Account</p>
        </Link>
    )

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