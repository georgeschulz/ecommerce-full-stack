import WizardTemplate from "./wizardTemplate";

function WizardFour() {
    return (
        <WizardTemplate
            num='3'
            maxNum='5'
            percent='60'
            headline='Compare Programs'
            instructions="Please indicate whether you are a new or existing customer so that your quote can be customized for your home."
            body=''
        />
    )
}

export default WizardFour;