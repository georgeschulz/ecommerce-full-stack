import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import logo from '../../assets/better-logo.jpeg';
import Nav from '../../components/nav/nav';
import explainer from '../../assets/Howitworks.png';
import PestButtonRowSmall from '../../components/pestButtonRowSmall/pestButtonRowSmall';
import SmallServiceHighlightRow from '../../components/smallServiceHighlightRow/smallServiceHighlightRow';
import Footer from '../../components/footer/footer';

function Home() {
    return (
        <div>
            <Nav
                homeNav="main"
                showSolution={true}
                showServices={true}
                showAccountSettings={true}
            />
            <section id="hero">
                <img src={logo} />
                <h1>Solve Your Pest Problem How You Want To</h1>
                <p className='subheader'>No pushy salespeople. Get your custom quote and schedule without ever having to call. Take the time you need to compare your options how YOU like to buy.</p>
                <Link to="/wizard/1" className='button-large'>Get My Quote</Link>
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
            <section id="explainer">
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