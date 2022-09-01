import WizardTemplate from "./wizardTemplate";
import { useEffect, useState } from "react";
import { getDetailedServiceInfo } from "../../api/getServices";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/auth";
import { selectSelectedPest } from "../../features/wizardSlice";
import MediumServiceBox from "../../components/mediumServiceBox/mediumServiceBox";
import AddToCartButton from "../../components/buttons/addToCartButton";
import GetServiceInfoButton from "../../components/buttons/getServiceInfoButton";

function WizardFour() {
    const [servicesFound, setServicesFound] = useState([]);
    const userId = useSelector(selectUserId);
    const target = useSelector(selectSelectedPest);
    let body;

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getDetailedServiceInfo(userId, target);
                setServicesFound(data.data.services);
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    return (
        <WizardTemplate
            num='3'
            maxNum='5'
            percent='60'
            headline='Compare Programs'
            instructions="Please indicate whether you are a new or existing customer so that your quote can be customized for your home."
            body={
                <div className='service-outer-container'>
                    <div className="services-container">
                        {servicesFound.length > 0 ? servicesFound.map(service => {
                            return (
                                <MediumServiceBox
                                    serviceName={service.service_name}
                                    billingType={service.billing_type}
                                    billingAmount={service.billing_amount}
                                    frequency={service.frequency}
                                    benefits={service.benefits}
                                    serviceId={service.service_id}
                                    key={service.service_id}
                                    width='460px'
                                    showImg={true}
                                    buttons={[
                                        <AddToCartButton
                                            serviceId={service.service_id}
                                            target={target}
                                        />, 
                                        <GetServiceInfoButton serviceId={service.service_id} />
                                    ]}
                                />)
                        }) : ''}
                    </div>
                </div>

            }
        />
    )
}

export default WizardFour;