import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailedServiceInfoByServiceId } from "../../api/getServices";
import { useSelector } from 'react-redux';
import { selectSelectedPest } from "../../features/wizardSlice";
import Nav from "../../components/nav/nav";
import './serviceDetail.css'
import MediumServiceBox from "../../components/mediumServiceBox/mediumServiceBox";
import { defaultTesting } from "./defaultTesting";
import AddToCartButton from "../../components/buttons/addToCartButton";
import CoveredPests from "../../components/coveredPests/coveredPests";
import Footer from "../../components/footer/footer";
import TestimonialBlock from "../../components/testimonialBlock/testimonialBlock";
import Gallery from "../../components/gallery/gallery";
import { getDetailedServiceInfoWithoutPricingById } from "../../api/getServices";
import { selectIsAuth } from "../../features/auth";
import GetQuoteButton from "../../components/buttons/getQuoteButton";

function ServiceDetailNoPricing() {
    const { serviceId } = useParams();
    const target = useSelector(selectSelectedPest);
    const [service, setService] = useState(defaultTesting);
    const isPestSelected = useSelector(selectSelectedPest) != false;
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        (async () => {
            try {
                const response = await getDetailedServiceInfoWithoutPricingById(serviceId);
                setService(response.data)
            } catch (e) {
                console.log(e)
                setService(defaultTesting)
            }
        })();
    }, [isPestSelected, isAuth])

    return (
        <div>
            <div className="banner-img">
            <img src={`/images/services/${service.bannerImg.path}.${service.bannerImg.file_type}`} />
            </div>
            <div className="row">
                <h2>{service.service_name}</h2>
            </div>
            <div className="service-highlights">
                <MediumServiceBox
                    includePricing={isAuth && isPestSelected}
                    startsAt={service.base_price}
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
                        <GetQuoteButton 
                            serviceId={serviceId}
                            show={true}
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
                <GetQuoteButton 
                    serviceId={serviceId}
                    show={true}
                />
            </div>
            <Footer />

        </div>
    )
}

export default ServiceDetailNoPricing;