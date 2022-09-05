import { endpoint } from "./config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const addToCartApi = async (serviceId, target, userId) => {
    return await axios.post(`${endpoint}/cart/service/${serviceId}`, {target})
}

export const getStripeLink = async (customer_id, date_scheduled) => {
    return await axios.post(`${endpoint}/cart/stripe`, {date_scheduled});
}