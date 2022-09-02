import axios from "axios";
import { endpoint } from "./config";

export const getCities = async () => {
    return await axios.get(`${endpoint}/schedule/cities`);
}

export const getAvailability = async (customerId) => {
    return await axios.get(`${endpoint}/schedule/availability/user/${customerId}`);
}

export const setAppointmentDate = async (routeId, customerId) => {
    return await axios.put(`${endpoint}/schedule/user/${customerId}/route/${routeId}`);
}