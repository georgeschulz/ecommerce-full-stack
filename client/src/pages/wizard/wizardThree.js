import WizardTemplate from "./wizardTemplate";
import PestButtonRowLarge from "../../components/pestButtonRowLarge/pestButtonRowLarge";

function WizardThree() {
    return (
        <WizardTemplate
            num='2'
            maxNum='5'
            percent='40'
            headline='Select the pest you are having issues with'
            instructions="Please choose the top pest you are concerned with. If you are not currently seeing anything paticular or you’re just looking  for a proactive gneeral plan, choose Bugs."
            body={<div className="row row-center"><PestButtonRowLarge /></div>}
        />
        
    )
}

export default WizardThree;