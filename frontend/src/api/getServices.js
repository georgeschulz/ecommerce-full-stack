import { endpoint } from "./config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getServices = async (target, programType, warranty) => {
    const response = await fetch(`${endpoint}/services`);
    const data = await response.json();
    return data;
}

export const getDetailedServiceInfo = async (customerId, target) => {
    return await axios.get(`${endpoint}/services/detail?target=${target}`);
}

export const getDetailedServiceInfoByServiceId = async (customerId, target, serviceId) => {
    return await axios.get(`${endpoint}/services/detail/${serviceId}?target=${target}`)
}