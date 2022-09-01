import { endpoint } from "./config";
import axios from "axios";

export const addToCartApi = async (serviceId, target, userId) => {
    return await axios.post(`${endpoint}/cart/${userId}/service/${serviceId}`, {target})
}

//localhost:4000/cart/:customer_id/service/:service_id