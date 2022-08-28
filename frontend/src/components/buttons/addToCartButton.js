import { Link } from "react-router-dom";

import MediumButton from "./mediumButton";

function AddToCartButton() {
    return (
        <MediumButton redirect={'/'} level='primary'>
            Add to Cart
        </MediumButton>
    )
}

export default AddToCartButton;