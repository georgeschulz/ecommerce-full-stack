import './footer.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../features/auth';

function Footer() {
    const isAuth = useSelector(selectIsAuth);

    return (
        <footer>
            <div className='nav-group'>
                <div className='column'>
                    <b>ABC Pest Control</b>
                    <p>123 ABC Way</p>
                    <p>Harrisonburg, VA 22801</p>
                    <p>{'(123) 123-1234'}</p>
                    <br />
                    <p className='hidden-mobile'>Copyright 2022. All Rights Reserved</p>
                </div>
                <div className="column">
                    <b>Navigation</b>
                    <ul className='footer-nav'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Services Catalog</Link></li>
                        <li><Link to={isAuth ? '/wizard/2' : '/wizard/1'}>Quote Wizard</Link></li>
                        <li><Link to='/privacy'>Privacy Policy</Link></li>
                        <li><Link to='/terms'>Terms and Conditions</Link></li>
                    </ul>

                </div>
            </div>
        </footer>
    )
}

export default Footer;
