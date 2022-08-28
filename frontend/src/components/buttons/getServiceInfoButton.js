import MediumButton from "./mediumButton";

function GetServiceInfoButton({ serviceId }) {
    return (
        <MediumButton redirect={`/service/${serviceId}`} level="secondary">
            Learn More
        </MediumButton>
    );
}

export default GetServiceInfoButton;