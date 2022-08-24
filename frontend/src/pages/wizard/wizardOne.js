import Nav from "../../components/nav/nav";
import ProgressBar from "../../components/progressBar/progressBar";
import './wizard.css'

function WizardOne() {
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
            

        </div>
    )
}

export default WizardOne;