import Nav from "../../components/nav/nav";
import ProgressBar from "../../components/progressBar/progressBar";

function WizardTemplate({ num, maxNum, headline, percent, instructions, body }) {
    return (
        <div className="wizard-container">
            <Nav
                homeNav="store"
                showSolution={true}
                showServices={true}
                showAccountSettings={true}
            />
            <div className="wizard-content-container">
                <h1 className="wizard-header">Step {num} / {maxNum}: {headline}</h1>
                <ProgressBar percent={percent} />
                <p>{instructions}</p>
                <div className="wizard-body">
                    {body}
                </div>
            </div>
            
        </div>
    )
}

export default WizardTemplate;