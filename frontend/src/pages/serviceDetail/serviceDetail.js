import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailedServiceInfoByServiceId } from "../../api/getServices";
import { useSelector } from 'react-redux';
import { selectSelectedPest } from "../../features/wizardSlice";
import { selectUserId } from "../../features/auth";

function ServiceDetail() {
    const { serviceId } = useParams();
    const userId = useSelector(selectUserId);
    const target = useSelector(selectSelectedPest);
    const [service, setService] = useState(null);


    useEffect(() => {
        const getService = async () => {
            const response = await getDetailedServiceInfoByServiceId(userId, target, serviceId);
            setService(response.data)
        }
        getService();
    }, [])

    return (
        <p>Service details:</p>
    )
}

export default ServiceDetail;