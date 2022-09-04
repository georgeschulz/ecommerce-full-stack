import { endpoint } from "./config";
import axios from "axios";

export const getAccountInfo = async (customerId) => {
    const response = await fetch(`${endpoint}/users/${customerId}`);
    const data = await response.json();
    return data;
}

export const updateAccountInfo = async (customerId, data) => {
    return await axios.put(`${endpoint}/users/${customerId}`, data);
}