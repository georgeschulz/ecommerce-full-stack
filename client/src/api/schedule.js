import axios from "axios";
import { endpoint } from "./config";
axios.defaults.withCredentials = true;

export const getCities = async () => {
    return await axios.get(`${endpoint}/schedule/cities`);
}

export const getAvailability = async () => {
    return await axios.get(`${endpoint}/schedule/availability`);
}

export const setAppointmentDate = async (routeId) => {
    return await axios.put(`${endpoint}/schedule/route/${routeId}`);
}