import { endpoint } from "./config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getCSRFToken = async () => {
    const response = await axios.get(`${endpoint}/users/getCSRFToken`);
    axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
}

export const getAccountInfo = async () => {
    await getCSRFToken();
    const response = await fetch(`${endpoint}/users`,
        {credentials: 'include'}
    );
    const data = await response.json();
    return data;
}

export const updateAccountInfo = async (data) => {
    await getCSRFToken();
    return await axios.put(`${endpoint}/users`, data);
}