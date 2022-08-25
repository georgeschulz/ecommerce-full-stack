import './mediumInfoBox.css';

function MediumInfoBox({button, children}) {
    return (
        <div className="medium-info-box">
            {children}
            <div className="medium-info-boxbutton-container">
                {button}
            </div>
        </div>
    )
}

export default MediumInfoBox;