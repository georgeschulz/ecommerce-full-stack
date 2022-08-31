import MediumButton from "./mediumButton";

function BookButton() {
    return (
        <MediumButton redirect={'/wizard/6'} level='primary'>
            Book
        </MediumButton>
    )
}

export default BookButton;