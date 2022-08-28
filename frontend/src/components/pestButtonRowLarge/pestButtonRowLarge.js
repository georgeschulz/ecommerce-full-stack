import React from "react";
import PestButton from "../pestButton/pestButton";
import ants from '../../assets/pest icons/ants.png';
import bees from '../../assets/pest icons/bees.png';
import spiders from '../../assets/pest icons/spiders.png';
import termites from '../../assets/pest icons/termites.png';
import mosquito from '../../assets/pest icons/mosquito.png';
import rodent from '../../assets/pest icons/rodent.png';
import aphid from '../../assets/pest icons/aphids.png';
import cockroaches from '../../assets/pest icons/cockroaches.png';
import fleas from '../../assets/pest icons/fleas.png';
import other from '../../assets/pest icons/other.png';
import ticks from '../../assets/pest icons/ticks.png';

import { useSelector } from "react-redux";
import { selectIsAuth } from "../../features/auth";


function PestButtonRowLarge(props) {
    const isAuth = useSelector(selectIsAuth);

    const pests = [
        { name: 'ants', img: '/images/ants.png'},
        { name: 'bees', img: bees},
        { name: 'spiders', img: spiders},
        { name: 'termites', img: termites},
        { name: 'mosquitoes', img: mosquito},
        { name: 'rodent', img: rodent },
        { name: 'aphid', img: aphid},
        { name: 'cockroaches', img: cockroaches },
        { name: 'fleas', img: fleas },
        { name: 'other', img: other},
        { name: 'ticks', img: ticks}
    ]

    const buttons = pests.map(pest => {
        return (<PestButton 
            key={pest.name}
            name={pest.name}
            img={pest.img}
            redirect='/wizard/4'
        />)
    })

    return (
        <div className="large-button-container">
            {buttons}
        </div>
    )
}

export default PestButtonRowLarge;