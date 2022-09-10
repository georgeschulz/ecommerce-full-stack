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
import { useNavigate } from "react-router-dom";
import { selectIsAuth } from "../../features/auth";

function ServiceDetail() {
    const { serviceId } = useParams();
    const target = useSelector(selectSelectedPest);
    const [service, setService] = useState(defaultTesting);
    const isAuth = useSelector(selectIsAuth)

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                if(!isAuth || !target) {
                    throw new Error('Please log into receive detailed pricing data');
                }
                const response = await getDetailedServiceInfoByServiceId(target, serviceId);
                setService(response.data)
            } catch (e) {
                console.log(e)
                navigate('/service/general/' + serviceId)
            }
        })();
    }, [isAuth])

    return (
        <div>
            <div className="banner-img">
            <img src={`/images/services/${service.bannerImg.path}.${service.bannerImg.file_type}`} />
            </div>
            <div className="service-header">
                <h2>{service.service_name}</h2>
                <p>{service.description}</p>
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
                    includePricing={true}
                    buttons={[
                        <AddToCartButton
                            serviceId={serviceId}
                            target={target}
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
                <AddToCartButton
                    serviceId={serviceId}
                    target={target}
                    show={true}
                />
            </div>
            <Footer />

        </div>
    )
}

export default ServiceDetail;