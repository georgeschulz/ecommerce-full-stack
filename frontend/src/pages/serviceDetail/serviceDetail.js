import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailedServiceInfoByServiceId } from "../../api/getServices";
import { useSelector } from 'react-redux';
import { selectSelectedPest } from "../../features/wizardSlice";
import { selectUserId } from "../../features/auth";
import Nav from "../../components/nav/nav";
import './serviceDetail.css'
import MediumServiceBox from "../../components/mediumServiceBox/mediumServiceBox";
import { defaultTesting } from "./defaultTesting";
import AddToCartButton from "../../components/buttons/addToCartButton";
import CoveredPests from "../../components/coveredPests/coveredPests";
import Footer from "../../components/footer/footer";
import TestimonialBlock from "../../components/testimonialBlock/testimonialBlock";
import Gallery from "../../components/gallery/gallery";

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
                homeNav="results"
                showSolution={false}
                showServices={true}
                showAccountSettings={true}
            />
            <div className="banner-img">
            <img src={`/images/services/${service.bannerImg.path}.${service.bannerImg.file_type}`} />
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
                    setupFee={service.setup_fee}
                    width='480px'
                    showImg={false}
                    buttons={[
                        <AddToCartButton
                            serviceId={serviceId}
                            target={target}
                        />
                    ]}
                />
                <Gallery images={service.supportingImages} />
            </div>
            <div className="row row-center">
                <h4>Covered Pests</h4>
            </div>
            
            <div className="row row-center">
                <CoveredPests pestList={service.coveredPests} />
            </div>
            <div className="row row-center">
                <h4>The ABC Promise</h4>
            </div>
            <div className="row row-center gauruntee">
                <p>We believe customers expect prompt, friendly and effective service. If you are ever unhappy with your service, your plan covers unlimited free callbacks in between services. If we can't find a way to make you happy, you can cancel at anytime. </p>
            </div>

            <div className="row row-center">
                <TestimonialBlock testimonials={service.testimonials}/>
            </div>
            <div className="cta">
                <h4>Sign Up Today</h4>
                <p>Set up your {service.service_name} today - totally online in 3 minutes or less.</p>
                <AddToCartButton
                    serviceId={serviceId}
                    target={target}
                />
            </div>
            <Footer />

        </div>
    )
}

export default ServiceDetail;