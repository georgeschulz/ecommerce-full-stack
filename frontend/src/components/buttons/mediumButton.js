import { Link } from "react-router-dom";

function MediumButton({ redirect, level, children }) {
    return (
        <Link to={redirect}>
            <p className={`button-medium button-color-${level} button-text-small`}>{children}</p>
        </Link>
    );
}

export default MediumButton;