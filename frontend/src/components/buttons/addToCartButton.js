import { Link } from "react-router-dom";

import MediumButton from "./mediumButton";

function AddToCartButton() {
    return (
        <MediumButton redirect={'/wizard/5'} level='primary'>
            Add to Cart
        </MediumButton>
    )
}

export default AddToCartButton;