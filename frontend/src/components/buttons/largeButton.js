import { Link } from "react-router-dom";

function LargeButton({ redirect, level, children, onClick }) {
    const withLink = (
        <Link to={redirect} onClick={() => onClick()}>
            <p className={`button-large button-color-${level}`}>{children}</p>
        </Link>
    )  

    const withoutLink = (
        <p className={`button-large button-color-${level}`} onClick={() => onClick()}>{children}</p>
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

export default LargeButton;