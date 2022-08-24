import { Link } from 'react-router-dom'

function LargeServiceBox({name, benefits, price, priceType, link}) {
    return (
        <Link to={link}>
            <div className='large-box'>
                
            </div>
        </Link>
    )
}

export default LargeServiceBox;