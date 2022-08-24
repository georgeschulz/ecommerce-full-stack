import { endpoint } from "./config";
import axios from 'axios';
axios.defaults.withCredentials = true;

export const onLogin = async (loginData) => {
    return await axios.post(`${endpoint}/login`, loginData);
}
