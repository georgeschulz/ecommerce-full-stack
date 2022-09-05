import { endpoint } from "./config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getAccountInfo = async (customerId) => {
    const response = await fetch(`${endpoint}/users`,
        {credentials: 'include'}
    );
    const data = await response.json();
    return data;
}

export const updateAccountInfo = async (customerId, data) => {
    return await axios.put(`${endpoint}/users`, data);
}