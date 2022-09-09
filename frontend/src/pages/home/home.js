import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import logo from '../../assets/better-logo.jpeg';
import explainer from '../../assets/Howitworks.png';
import PestButtonRowSmall from '../../components/pestButtonRowSmall/pestButtonRowSmall';
import SmallServiceHighlightRow from '../../components/smallServiceHighlightRow/smallServiceHighlightRow';
import Footer from '../../components/footer/footer';
import { useEffect } from 'react';
import { endWizardFlow } from '../../features/wizardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../features/auth';
import { setReferringServiceId } from '../../features/wizardSlice';
import StartWizardButton from '../../components/buttons/startWizardButton';

function Home() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)
    useEffect(() => {
        dispatch(endWizardFlow())
        dispatch(setReferringServiceId({referringServiceId: null}))
    }, [])

    return (
        <div>
            <section id="hero">
                <img src={logo} className="hidden-tablet-and-below" />
                <h1>Solve Your Pest Problem How You Want To</h1>
                <p className='subheader'>No pushy salespeople. Get your custom quote and schedule without ever having to call. Take the time you need to compare your options how YOU like to buy.</p>
                <StartWizardButton />
            </section>
            <section id="issues">
                <h2>Browse by Issue</h2>
                <p className='subheader'>Click the main pest you are seeing right now to find a program right for you.</p>
                <PestButtonRowSmall />
            </section>
            <section id="services">
                <h2>Popoular Services</h2>
                <div className='row row-center'>
                    <SmallServiceHighlightRow />
                </div>
            </section>
            <section id="explainer" className='hidden-mobile'>
                <h2>How It Works</h2>
                <div className='row row-center'>
                    <img src={explainer} id="explainer-img" />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home;