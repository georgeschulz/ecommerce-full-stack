import { endpoint } from "./config";
import axios from "axios";
//this attatches cookie automatically. Very important or you will run into endless 401 errors
axios.defaults.withCredentials = true;

export const createRoute = async (date) => {
    return await axios.post(`${endpoint}/admin/routes/new`, {date});
}

export const getAvailability = async () => {
    return await axios.get(`${endpoint}/admin/schedule`);
}

export const setAvailability = async (newValue, routeId) => {
    return await axios.put(`${endpoint}/admin/routes`, {newValue, routeId});
}