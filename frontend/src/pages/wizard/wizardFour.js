import WizardTemplate from "./wizardTemplate";
import { useEffect, useState } from "react";
import { getDetailedServiceInfo } from "../../api/getServices";
import { useSelector } from "react-redux";
import { selectUserId } from "../../features/auth";
import { selectSelectedPest } from "../../features/wizardSlice";

function WizardFour() {
    const [servicesFound, setServicesFound] = useState([]);
    const userId = useSelector(selectUserId);
    const target = useSelector(selectSelectedPest);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getDetailedServiceInfo(userId, target);
                setServicesFound(data.data);
            } catch (e) {
                console.log(e);
            }
        }
        getData();   
    }, [])

    return (
        <WizardTemplate
            num='3'
            maxNum='5'
            percent='60'
            headline='Compare Programs'
            instructions="Please indicate whether you are a new or existing customer so that your quote can be customized for your home."
            body=''
        />
    )
}

export default WizardFour;