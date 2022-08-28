import deweb from '../../assets/deweb.JPG';
import './mediumServiceBox.css';
import BenefitList from '../benefitsList/benefitsList';
import { Link } from 'react-router-dom';

function MediumServiceBox({ serviceName, billingType, billingAmount, frequency, benefits, serviceId, buttons, width, showImg }) {
    //destructure the data from the service object

    return (
        <div className="medium-service-box" style={{'width': width}}>
            <div className={showImg ? 'medium-service-box-banner' : 'hidden'}>
                <img src={deweb} />
            </div>
            <div className='medium-service-box-content'>
                <h2>{serviceName}</h2>
                <p>$ {billingAmount} / {billingType} | {frequency} Services per Year</p>
                <BenefitList benefits={benefits} />
                <div className="medium-service-box-button-container">
                    {buttons.map((button, i) => {
                        return ( <div key={i}>{button}</div> );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MediumServiceBox;