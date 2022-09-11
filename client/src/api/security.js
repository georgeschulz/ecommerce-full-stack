import axios from "axios";
import { endpoint } from "./config";

export const getCSRFToken = async () => {
    const response = await axios.get(`${endpoint}/users/getCSRFToken`);
    axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
}