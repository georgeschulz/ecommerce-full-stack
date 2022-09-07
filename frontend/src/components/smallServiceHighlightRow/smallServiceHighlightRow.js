import SmallServiceBox from "../smallServiceBox/smallServiceBox";
import { selectIsAuth } from "../../features/auth";
import { selectSelectedPest } from "../../features/wizardSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getFeaturedServices } from "../../api/getServices";

function SmallServiceHighlightRow() {
    const isPestSelected = useSelector(selectSelectedPest);
    const isAuth = useSelector(selectIsAuth);
    const [services, setServices] = useState([]);
   
    useEffect(() => {
        (async () => {
            try {
                const response = await getFeaturedServices();
                setServices(response.data)
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    const serviceBoxes = services.map(service => {
        const description = service.description != null ? service.description.slice(0, 100) : '';
        const descriptionElement = <span>{description} <span className="link">... click to read more</span></span>

        return (
            <SmallServiceBox
                key={service.service_id}
                name={service.service_name}
                subtext={descriptionElement}
                img={`/images/services/${service.img_path}`}
                link={isAuth && isPestSelected ? `/service/${service.service_id}` : `/service/general/${service.service_id}`}
            />
        )
    })

    return (
        <div className="row row-center">
            {serviceBoxes}
        </div>
    )
}

export default SmallServiceHighlightRow;