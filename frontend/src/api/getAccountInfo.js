import { endpoint } from "./config";

export const getAccountInfo = async (customerId) => {
    const response = await fetch(`${endpoint}/users/${customerId}`);
    const data = await response.json();
    return data;
}