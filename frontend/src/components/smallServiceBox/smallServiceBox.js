import './smallServiceBox.css'
import { Link } from 'react-router-dom';

function SmallServiceBox({name, img, subtext, link}) {
    return (
        <Link to={link}>
            <div className='small-box'>
                <img src={img} alt={name} />
                <div className='small-box-text-content'>
                    <h4>{name}</h4>
                    <p>{subtext}</p>
                </div>
            </div>
        </Link>
    )
}

export default SmallServiceBox;