import React from "react";
import PestButton from "../pestButton/pestButton";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../features/auth";
import { useEffect } from "react";
import { getHomeTargets } from "../../api/getTargets";
import { useState } from "react";


function PestButtonRowSmall(props) {
    const isAuth = useSelector(selectIsAuth);
    let [pests, setPests] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await getHomeTargets();
                setPests(response.data)
            } catch(e) {
                console.log(e)
            }
        })();
    }, [])
    

    const buttons = pests.map(pest => {
        return (<PestButton 
            key={pest.pest_name}
            name={pest.pest_name}
            img={`images/icons/${pest.path}`}
            redirect={isAuth ? '/wizard/2' : '/wizard/1'}
        />)
    })

    return (
        <div className="row row-center">
            {buttons}
        </div>
    )
}

export default PestButtonRowSmall;