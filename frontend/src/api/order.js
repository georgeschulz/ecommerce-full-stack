import { endpoint } from "./config";
import axios from "axios";

export const getOrderByStripeSession = async (stripeSession) => {
    return await axios.get(`${endpoint}/orders/stripe/${stripeSession}`);
}