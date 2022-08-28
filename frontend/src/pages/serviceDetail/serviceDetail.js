import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailedServiceInfoByServiceId } from "../../api/getServices";
import { useSelector } from 'react-redux';
import { selectSelectedPest } from "../../features/wizardSlice";
import { selectUserId } from "../../features/auth";
import Nav from "../../components/nav/nav";
import lawnshieldImage from '../../assets/lawnshieldBanner.JPG';
import rodentImage from '../../assets/rodentbait.JPG';
import './serviceDetail.css'
import MediumServiceBox from "../../components/mediumServiceBox/mediumServiceBox";
import { defaultTesting } from "./defaultTesting";
import AddToCartButton from "../../components/buttons/addToCartButton";

function ServiceDetail() {
    const { serviceId } = useParams();
    const userId = useSelector(selectUserId);
    const target = useSelector(selectSelectedPest);
    const [service, setService] = useState(defaultTesting);


    useEffect(() => {
        (async () => {
            try {
                const response = await getDetailedServiceInfoByServiceId(userId, target, serviceId);
                setService(response.data)
            } catch (e) {
                console.log(e)
                setService(defaultTesting)
            }
        })();
    }, [])

    return (
        <div>
            <Nav
                homeNav="store"
                showSolution={false}
                showServices={true}
                showAccountSettings={true}
            />
            <div className="banner-img">
                <img src={lawnshieldImage} />
            </div>
            <div className="row">
                <h2>{service.service_name}</h2>
            </div>
            <div className="service-highlights">
                <MediumServiceBox
                    serviceName="Highlights"
                    billingType={service.billing_type}
                    billingAmount={service.billing_amount}
                    frequency={service.frequency}
                    benefits={service.benefits}
                    serviceId={service.service_id}
                    width='480px'
                    showImg={false}
                    buttons={[
                        <AddToCartButton />
                    ]}
                />
                <img src={rodentImage} className="feature-img" />
            </div>
            <h4>Covered Pests</h4>
            <div className="row">
                <ul className="covered-pests">
                    <li>American Roaches</li>
                    <li>Ants</li>
                    <li>Box Elder Bugs</li>
                    <li>Brown Banded Roaches</li>
                    <li>Camel Crickets</li>
                    <li>Centipedes</li>
                    <li>Cigarrette Beetles</li>
                    <li>Clover Mites</li>
                    <li>Drug Store Beetles</li>
                    <li>Spiders</li>
                    <li>Sow Bugs</li>
                    <li>Wasps, at Ground Level</li>
                    <li>American Roaches</li>
                    <li>Ants</li>
                </ul>
            </div>
            <div className="row">
                <h4>The ABC Promise</h4>
                <p>We believe customers expect prompt, friendly and effective service. If you are ever unhappy with your service, your plan covers unlimited free callbacks in between services. If we can't find a way to make you happy, you can cancel at anytime. </p>
            </div>


        </div>
    )
}

export default ServiceDetail;