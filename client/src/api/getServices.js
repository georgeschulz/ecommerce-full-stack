import { endpoint } from "./config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getServices = async (target, programType, warranty) => {
    const response = await fetch(`${endpoint}/services`);
    const data = await response.json();
    return data;
}

export const getDetailedServiceInfo = async (target) => {
    return await axios.get(`${endpoint}/services/detail?target=${target}`);
}

export const getDetailedServiceInfoByServiceId = async (target, serviceId) => {
    return await axios.get(`${endpoint}/services/detail/${serviceId}?target=${target}`)
}

export const getDetailedServiceInfoWithoutPricing = async () => {
    return await axios.get(`${endpoint}/services`);
}

export const getDetailedServiceInfoWithoutPricingById = async (serviceId) => {
    return await axios.get(`${endpoint}/services/${serviceId}`)
}

export const getFeaturedServices = async () => {
    return await axios.get(`${endpoint}/services/featured`);
}