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
import { getPestList } from "../../api/getTargets";

function Catalog() {
    const [services, setServices] = useState([]);
    const [pestList, setPestList] = useState([]);
    const [pestFilter, setPestFilter] = useState("all");
    const [recurringFilter, setRecurringFilter] = useState("all");
    const [warrantyFilter, setWarrantyFilter] = useState("all")
    const isAuth = useSelector(selectIsAuth);
    const isPestSelected = useSelector(selectSelectedPest) != false;

    const filteredServices = 
        services
            .map(service => {
                return {
                    ...service,
                    isRecurring: [service.isRecurring ? "recurring" : "once", "all"],
                    includesWarranty: [service.includesWarranty ? "yes" : "no", "all"],
                    covered_pests: [...service.covered_pests, "all"]
                }
            })
            .filter(service => service.covered_pests.includes(pestFilter))
            .filter(service => service.isRecurring.includes(recurringFilter))
            .filter(service => service.includesWarranty.includes(warrantyFilter));

    useEffect(() => {
        (async () => {
            const response = await getDetailedServiceInfoWithoutPricing();
            setServices(response.data);
        })(); 
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await getPestList();
                setPestList(response.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [])

    return (
        <div>
            <header className="filters">
                <h2 className="page-header">Our Offerings</h2>
                <div className="filters">
                    <div className="filter-group">
                        <label htmlFor="target">Pest Type</label>
                        <select name="target" className="filter" value={pestFilter} onChange={(e) => setPestFilter(e.target.value)}>
                            <option value="all"></option>
                            {pestList.map((pest, i) => {
                                return (
                                    <option key={i} value={pest.value}>{pest.text}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="serviceType">Service Type</label>
                        <select name="serviceType" className="filter" value={recurringFilter} onChange={(e) => setRecurringFilter(e.target.value)}>
                            <option value="all"></option>
                            <option value="once">One Time</option>
                            <option value="recurring">Ongoing Program</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="warranty">Includes Warranty?</label>
                        <select name="warranty" className="filter" value={warrantyFilter} onChange={(e)=> setWarrantyFilter(e.target.value)}>
                            <option value="all"></option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>
            </header>
            <div className="services-container">
                {filteredServices.length === 0
                    ? <p>Sorry, looks like there are no services with these parameters.</p>
                    : filteredServices.map(service => {
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