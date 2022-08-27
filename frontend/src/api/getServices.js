import { endpoint } from "./config";
import axios from "axios";

export const getServices = async (target, programType, warranty) => {
    const response = await fetch(`${endpoint}/services`);
    const data = await response.json();
    return data;
}

export const getDetailedServiceInfo = async (customerId, target) => {
    console.log(target)
    return await axios.get(`${endpoint}/services/detail/user/${customerId}?target=${target}`);
}