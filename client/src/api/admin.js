import { endpoint } from "./config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const createRoute = async (date) => {
    return await axios.post(`${endpoint}/admin/routes/new`, {date});
}

export const getAvailability = async () => {
    return await axios.get(`${endpoint}/admin/schedule`);
}