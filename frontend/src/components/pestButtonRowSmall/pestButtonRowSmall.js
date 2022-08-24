import React from "react";
import PestButton from "../pestButton/pestButton";
import ants from '../../assets/pest icons/ants.png';
import bees from '../../assets/pest icons/bees.png';
import spiders from '../../assets/pest icons/spiders.png';
import termites from '../../assets/pest icons/termites.png';
import mosquito from '../../assets/pest icons/mosquito.png';
import rodent from '../../assets/pest icons/rodent.png';


function PestButtonRowSmall(props) {
    const pests = [
        { name: 'ants', img: ants},
        { name: 'bees', img: bees},
        { name: 'spiders', img: spiders},
        { name: 'termites', img: termites},
        { name: 'mosquitoes', img: mosquito},
        { name: 'rodent', img: rodent } 
    ]

    const buttons = pests.map(pest => {
        return (<PestButton 
            name={pest.name}
            img={pest.img}
            redirect='/wizard/1'
        />)
    })

    return (
        <div className="row row-center">
            {buttons}
        </div>
    )
}

export default PestButtonRowSmall;