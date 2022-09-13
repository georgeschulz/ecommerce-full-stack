import React from 'react';
import './home.css';
import logo from '../../assets/better-logo.jpeg';
import explainer from '../../assets/Howitworks.png';
import PestButtonRowSmall from '../../components/pestButtonRowSmall/pestButtonRowSmall';
import SmallServiceHighlightRow from '../../components/smallServiceHighlightRow/smallServiceHighlightRow';
import Footer from '../../components/footer/footer';
import { useEffect } from 'react';
import { endWizardFlow } from '../../features/wizardSlice';
import { useDispatch } from 'react-redux';
import { setReferringServiceId } from '../../features/wizardSlice';
import StartWizardButton from '../../components/buttons/startWizardButton';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(endWizardFlow())
        dispatch(setReferringServiceId({referringServiceId: null}))
    }, [dispatch])

    return (
        <div>
            <section id="hero">
                <img src={logo} className="hidden-tablet-and-below" alt="logo" />
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
                    <img src={explainer} id="explainer-img" alt="our process explained" />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home;