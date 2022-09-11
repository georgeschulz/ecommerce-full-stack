import check from '../../assets/check.png';
import x from '../../assets/x.png';
import './benefitsList.css';

function BenefitList({benefits}) {
    return (
        <div className='benefits-list'>
            {benefits.map(benefit => {
                const {isgood, text, benefit_id} = benefit;
                return (
                    <p className="benefit-list-item" key={benefit_id}>
                        <img src={isgood ? check : x} alt={isgood ? 'includes' : 'not include'}/>
                        <span className="benefits-list-item-text">{text}</span>
                    </p>
                )
                
            })}
        </div>
    )
}

export default BenefitList;