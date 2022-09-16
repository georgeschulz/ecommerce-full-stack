import WizardTemplate from "../wizard/wizardTemplate";
import FinishSetupForm from "../../components/finishSetupForm/finishSetupForm";

function FinishSetupPage() {
    return (
        <WizardTemplate
            num={1}
            maxNum={5}
            headline="Finish Setting Up Your Account"
            percent={20}
            instructions="Please provide the rest of your contact information for an accurate estimate"
            body={
                <div className="row row-center">
                    <FinishSetupForm />
                </div>
            }
        />
    )
}

export default FinishSetupPage;