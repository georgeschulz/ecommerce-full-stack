import { endpoint } from "./config";
import axios from "axios";

export const addToCartApi = async (serviceId, target, userId) => {
    return await axios.post(`${endpoint}/cart/${userId}/service/${serviceId}`, {target})
}

export const getStripeLink = async (customer_id, date_scheduled) => {
    return await axios.post(`${endpoint}/cart/stripe/customer/${customer_id}`, {date_scheduled});
}