import React, {useState} from "react";
import './multipaneForm.css';

function MultipaneForm({title, panes, submit}) {
    const [paneIndex, setPaneIndex] = useState(0);
    const max = panes.length - 1;

    const next = () => setPaneIndex(paneIndex + 1);
    const back = () => setPaneIndex(paneIndex - 1);

    const handleKeyPress = (e) => {
        if(e.keyCode == 13 && paneIndex != max) {
            e.preventDefault();
            next();
        }
    }

    const panesElements = panes.map((pane, index) => {
        return (
            <div key={index} className={paneIndex === index ? 'pane-container' : 'pane-container hidden'}>
                {pane}
            </div>
        )
    })

    return (
        <div className="pane-outer-container">
            <h2>{title}</h2>
            <div className="multipane-content-container" onKeyDown={handleKeyPress}>
                {panesElements}
            </div>
            <div className='multipane-button-container'>
                <p className={paneIndex > 0 && paneIndex <= max  ? 'button-medium button-color-secondary' : 'hidden'} onClick={() => back()}>Last</p>
                <p className={paneIndex < max ? 'button-medium button-color-primary' : 'hidden'} onClick={() => next()}>Next</p>
                {paneIndex === max 
                    ? submit
                    : ''
                }
            </div>
        </div>
        
    )
}

export default MultipaneForm;