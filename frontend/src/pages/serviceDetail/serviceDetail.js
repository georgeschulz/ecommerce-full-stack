import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ServiceDetail() {
    const { serviceId } = useParams();

    return (
        <p>Service details</p>
    )
}

export default ServiceDetail;