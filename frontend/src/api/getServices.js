import { endpoint } from "./config";

export const getServices = async (target, programType, warranty) => {
    const response = await fetch(`${endpoint}/services`);
    const data = await response.json();
    return data;
}