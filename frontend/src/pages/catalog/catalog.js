import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import './catalog.css';
import { getDetailedServiceInfoWithoutPricing } from "../../api/getServices";
import { useEffect, useState } from "react";
import MediumServiceBox from "../../components/mediumServiceBox/mediumServiceBox";
import AddToCartButton from "../../components/buttons/addToCartButton";
import GetServiceInfoButton from "../../components/buttons/getServiceInfoButton";
import { selectIsAuth } from "../../features/auth";
import { useSelector } from "react-redux";
import { selectSelectedPest } from "../../features/wizardSlice";

function Catalog(props) {
    const [services, setServices] = useState([]);
    const isAuth = useSelector(selectIsAuth);
    const isPestSelected = useSelector(selectSelectedPest) != false;

    useEffect(() => {
        (async () => {
            const response = await getDetailedServiceInfoWithoutPricing();
            setServices(response.data);
        })(); 
    }, [])

    return (
        <div>
            <header>
                <h2 className="page-header">Our Offerings</h2>
                <div className="filters">
                    <div className="filter-group">
                        <label for="target">Pest Type</label>
                        <select name="target" className="filter">
                            <option value="ants">Ants</option>
                            <option value="rodents">Rodents</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label for="serviceType">Service Type</label>
                        <select name="serviceType" className="filter">
                            <option value="One Time">One Time</option>
                            <option value="Recurring">Ongoing Program</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label for="warranty">Includes Warranty?</label>
                        <select name="warranty" className="filter">
                            <option value="yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </header>
            <div className="services-container">
                {services.length === 0
                    ? ''
                    : services.map(service => {
                        return (
                            <MediumServiceBox
                                    includePricing={false}
                                    isPestSelected={isPestSelected}
                                    serviceName={service.service_name}
                                    billingType={service.billing_type}
                                    billingAmount={service.billing_amount}
                                    frequency={service.frequency}
                                    benefits={service.benefits}
                                    serviceId={service.service_id}
                                    key={service.service_id}
                                    width='520px'
                                    showImg={true}
                                    setupFee={service.setup_fee}
                                    startsAt={service.base_price}
                                    path={service.img_path}
                                    buttons={[
                                        <AddToCartButton
                                            serviceId={service.service_id}
                                            show={isPestSelected && isAuth}
                                        />, 
                                        <GetServiceInfoButton serviceId={service.service_id} showPricing={isPestSelected & isAuth} />
                                    ]}
                                />
                        )
                    })
                }
            </div>

            <Footer />
        </div>
    )
}

export default Catalog;