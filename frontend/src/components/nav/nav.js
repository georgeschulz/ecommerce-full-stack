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

function Nav(props) {
    const { homeNav, showSolution, showServices, showAccountSettings } = props;
    let isAuth = useSelector(selectIsAuth)
    let numCartItems = useSelector(selectNumCartItems);
    let homeNavElement;
    let cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //conditionally render what the home navigation should be - i.e. should it be the main site of company of store?
    switch (homeNav) {
        case "main":
            homeNavElement = <a href="https://bettertermite.com">{'<< Back to Main Site'}</a>
            break;
        case "store":
            homeNavElement = <Link to="/">{'<< Back to Store Home'}</Link>
            break;
        case "results":
            homeNavElement = <Link to="/wizard/4">{'<< Back to Service Results'}</Link>
            break;
        default:
            homeNavElement = "";
            break;
    }

    const startWizard = () => {
        dispatch(setReferringServiceId({referringServiceId: null}));
        dispatch(startWizardFlow());
        navigate(isAuth ? 'wizard/2' : 'wizard/1')
    }

    const handleLogout = async () => {
        try {
            dispatch(deauthorize())
            await onLogout();
        } catch (e) {
            console.log('Could not deauthorize: ', e)
        }
    }

    if(isAuth && showAccountSettings)  {
        cart = (
            <li className='nav-item cart-component' onClick={() => dispatch(toggleCartModal())}>
                <img src={cartImg} className="cart-icon" />
                Cart ({numCartItems})
            </li>
        );
    } else {
        cart = null;
    }

    return (
        <div>
            <SettingsModal />
            <CartModal />
        <nav>
            <div className='nav-left-group'>
                {homeNavElement}
            </div>
            <div className='nav-right-group'>
                <ul className='nav-list'>
                    <li className={showSolution ? 'nav-item' : 'hidden'} onClick={() => startWizard()}>
                        Find a Solution
                    </li>
                    <li className={showServices ? 'nav-item' : 'hidden'}>
                        <Link to="/catalog">View Services Catalog</Link>
                    </li>
                    <li className={showAccountSettings && !isAuth ? 'nav-item' : 'hidden'}>
                        <Link to="/login">Login</Link>
                    </li>
                    <li className={showAccountSettings && !isAuth ? 'nav-item' : 'hidden'}>
                        <Link to="/signup">Signup</Link>
                    </li>
                    {cart}
                    <li className={showAccountSettings && isAuth ? 'nav-item' : 'hidden'} onClick={() => dispatch(toggleSettingsModal())}>
                        Settings
                    </li>
                    <li onClick={() => handleLogout()} className={showAccountSettings && isAuth ? 'nav-item' : 'hidden'}>
                        <Link to="/login">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
        </div>
    )
}

export default Nav;