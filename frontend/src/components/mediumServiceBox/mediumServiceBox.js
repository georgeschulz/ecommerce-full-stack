import deweb from '../../assets/deweb.JPG';
import './mediumServiceBox.css';
import BenefitList from '../benefitsList/benefitsList';

function MediumServiceBox({ serviceName, billingType, billingAmount, frequency, benefits }) {
    //destructure the data from the service object

    return (
        <div className="medium-service-box">
            <div className='medium-service-box-banner'>
                <img src={deweb} />
            </div>
            <div className='medium-service-box-content'>
                <h2>{serviceName}</h2>
                <p>$ {billingAmount} / {billingType} | {frequency} Services per Year</p>
                <BenefitList benefits={benefits} />
                <div className="medium-service-box-button-container">
                    <p className='button-medium button-color-secondary button-text-small'>Learn More</p>
                    <p className='button-medium button-color-primary button-text-small'>Add to Cart</p>
                </div>
            </div>
        </div>
    );
}

export default MediumServiceBox;