import { endpoint } from "./config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const addToCartApi = async (serviceId, target, userId) => {
    return await axios.post(`${endpoint}/cart/service/${serviceId}`, {target})
}

export const getStripeLink = async (customer_id, date_scheduled) => {
    return await axios.post(`${endpoint}/cart/stripe`, {date_scheduled});
}

export const getCartContents = async () => {
    return await axios.get(`${endpoint}/cart`);
}

export const deleteCartItem = async(cartId) => {
    return await axios.delete(`${endpoint}/cart/${cartId}`);
}