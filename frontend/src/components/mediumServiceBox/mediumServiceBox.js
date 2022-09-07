import deweb from '../../assets/deweb.JPG';
import './mediumServiceBox.css';
import BenefitList from '../benefitsList/benefitsList';
import { Link } from 'react-router-dom';

function MediumServiceBox({ path, serviceName, billingType, billingAmount, frequency, benefits, serviceId, buttons, width, showImg, setupFee, includePricing, startsAt, isPestSelected }) {
    //destructure the data from the service object
    let pricing;
    
    if(includePricing) {
        pricing = (<p>${setupFee}, then ${billingAmount} / {billingType} | {frequency} Services per Year</p>);
    } else {
        pricing = (
            <p>Starting at ${startsAt} / Service. { isPestSelected ? '' : <Link style={{'color': 'darkgreen', 'textDecoration': 'underline'}} to="/login"> Login for an online quote</Link>}</p>
        );
    }

    return (
        <div className="medium-service-box" style={{'width': width}}>
            <div className={showImg ? 'medium-service-box-banner' : 'hidden'}>
                <img src={`/images/services/${path}`} />
            </div>
            <div className='medium-service-box-content'>
                <h2>{serviceName}</h2>
                {pricing}
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