import { Link } from "react-router-dom";

function MediumButton({ redirect, level, children }) {
    const withLink = (
        <Link to={redirect}>
            <p className={`button-medium button-color-${level} button-text-small`}>{children}</p>
        </Link>
    )  

    const withoutLink = (
        <p className={`button-medium button-color-${level} button-text-small`}>{children}</p>
    )

    if(redirect) {
        return (
            withLink
        )
    } else {
        return (
            withoutLink
        )
    }
}

export default MediumButton;