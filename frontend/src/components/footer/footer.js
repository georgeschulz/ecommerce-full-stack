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
                    <b>{'Better Termite & Pest Control'}</b>
                    <p>2647 Duke Street</p>
                    <p>Alexandria, VA 22314</p>
                    <p>{'(703) 683-2000'}</p>
                    <br />
                    <p>Copyright 2022. All Rights Reserved</p>
                </div>
                <div className="column">
                    <b>Navigation</b>
                    <ul className='footer-nav'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/catalog">Services Catalog</Link></li>
                        <li><Link to={isAuth ? '/wizard/2' : '/wizard/1'}>Quote Wizard</Link></li>
                        <li><a href="https://www.bettertermite.com/privacy-policy/">Privacy Policy</a></li>
                    </ul>

                </div>
            </div>
        </footer>
    )
}

export default Footer;
