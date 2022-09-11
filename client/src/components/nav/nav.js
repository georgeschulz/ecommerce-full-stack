import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../features/auth';
import { deauthorize } from '../../features/auth';
import { toggleSettingsModal } from '../../features/wizardSlice';
import SettingsModal from '../modal/settingsModal';
import cartImg from '../../assets/icons/cart.png'
import { toggleCartModal } from '../../features/cart';
import CartModal from '../modal/cartModal';
import { selectNumCartItems } from '../../features/cart';
import { startWizardFlow } from '../../features/wizardSlice';
import { setReferringServiceId } from '../../features/wizardSlice';
import { useNavigate } from 'react-router-dom';
import { onLogout } from '../../api/login';
import hamburger from '../../assets/icons/hamburger.png'
import logo from '../../assets/better-logo.jpeg'
import { selectShowNav } from '../../features/wizardSlice';
import { toggleNav } from '../../features/wizardSlice';
import x from '../../assets/icons/x-white.png'
import home from '../../assets/icons/home.png'

function Nav(props) {
    const { showSolution, showServices, showAccountSettings } = props;
    let isAuth = useSelector(selectIsAuth)
    let numCartItems = useSelector(selectNumCartItems);
    let showNav = useSelector(selectShowNav);
    let homeNavElement = <Link to="/">{'Home'}</Link>;
    let cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startWizard = () => {
        dispatch(toggleNav());
        dispatch(setReferringServiceId({ referringServiceId: null }));
        dispatch(startWizardFlow());
        navigate(isAuth ? 'wizard/2' : 'wizard/1')
    }

    const handleLogout = async () => {
        try {
            dispatch(toggleNav());
            dispatch(deauthorize())
            await onLogout();
        } catch (e) {
            console.log('Could not deauthorize: ', e)
        }
    }

    if (isAuth && showAccountSettings) {
        cart = (
            <li className='nav-item cart-component' onClick={() => dispatch(toggleCartModal())}>
                <img src={cartImg} className="cart-icon" alt="cart-menu" />
                Cart ({numCartItems})
            </li>
        );
    } else {
        cart = null;
    }

    const navElements = (
        <ul className='nav-list'>
            <li className={showSolution ? 'nav-item' : 'hidden'} onClick={() => startWizard()}>
                Find a Solution
            </li>
            <li className={showServices ? 'nav-item' : 'hidden'}>
                <Link onClick={() => dispatch(toggleNav())} to="/catalog">View Services Catalog</Link>
            </li>
            <li className={showAccountSettings && !isAuth ? 'nav-item' : 'hidden'}>
                <Link onClick={() => dispatch(toggleNav())} to="/login">Login</Link>
            </li>
            <li className={showAccountSettings && !isAuth ? 'nav-item' : 'hidden'}>
                <Link onClick={() => dispatch(toggleNav())} to="/signup">Signup</Link>
            </li>
            {cart}
            <li onClick={() => dispatch(toggleSettingsModal())} className={showAccountSettings && isAuth ? 'nav-item' : 'hidden'}>
                Settings
            </li>
            <li onClick={() => handleLogout()} className={showAccountSettings && isAuth ? 'nav-item' : 'hidden'}>
                <Link to="/login">Logout</Link>
            </li>
        </ul>
    );

    return (
        <div>
            <SettingsModal />
            <CartModal />
            <nav>
                <div className='nav-left-group'>
                    <Link to="/">
                        <img src={home} className="home-icon" alt="home-icon" />
                        <span className='hidden-tablet-and-below'>{homeNavElement}</span>
                    </Link>
                    <Link to="/"><img className='hidden-desktop nav-logo' src={logo} alt="logo" /></Link>
                </div>
                <div className='nav-right-group'>
                    <div className='nav-desktop hidden-tablet-and-below'>
                        {navElements}
                    </div>
                    <span className='hidden-desktop nav-icon-mobile'>{cart}</span>
                    <img className='hidden-desktop menu-button nav-icon-mobile' alt="menu button" src={showNav? x : hamburger} onClick={() => dispatch(toggleNav())} />
                </div>
            </nav>
            <div className={showNav ? 'mobile-menu-dropdown hidden-desktop' : 'hidden'}>
                {navElements}
            </div>
        </div>
    )
}

export default Nav;