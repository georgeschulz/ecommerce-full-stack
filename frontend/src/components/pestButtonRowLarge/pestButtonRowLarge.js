import React from "react";
import PestButton from "../pestButton/pestButton";
import { useState, useEffect } from "react";
import { getWizardTargets } from "../../api/getTargets";
import { useSelector } from "react-redux";
import { selectReferringServiceId } from "../../features/wizardSlice";


function PestButtonRowLarge(props) {
    const referringServiceId = useSelector(selectReferringServiceId);
    let [pest, setPest] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
                const response = await getWizardTargets();
                setPest(response.data);
            } catch(e) {
                console.log(e)
            }
        })();
    }, [])

    const buttons = pest.map(pest => {
        return (<PestButton 
            key={pest.pest_name}
            name={pest.pest_name}
            img={`/images/icons/${pest.path}`}
            redirect={referringServiceId ? `/service/${referringServiceId}` : '/wizard/4'}
        />)
    })

    return (
        <div className="large-button-container">
            {buttons}
        </div>
    )
}

export default PestButtonRowLarge;