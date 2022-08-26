import { endpoint } from "./config";

export const getAccountInfo = async (customerId) => {
    console.log(`${endpoint}/users/${customerId}`);
    const response = await fetch(`${endpoint}/users/${customerId}`);
    const data = await response.json();
    console.log(data);
    return data;
}