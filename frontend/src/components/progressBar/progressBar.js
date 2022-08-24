import './progressBar.css';

function ProgressBar({ percent }) {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div className="shaded" style={{width: percent + '%'}}></div>
                <div className="unshaded"vstyle={{width: '96%'}}></div>
            </div>
        </div>
    );
}

export default ProgressBar;