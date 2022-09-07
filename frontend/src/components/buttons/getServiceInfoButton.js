import MediumButton from "./mediumButton";

function GetServiceInfoButton({ serviceId, showPricing }) {
    return (
        <MediumButton 
            redirect={showPricing ? `/service/${serviceId}` : `/service/general/${serviceId}`} 
            level={showPricing ? "secondary" : "primary"}>
            Learn More
        </MediumButton>
    );
}

export default GetServiceInfoButton;