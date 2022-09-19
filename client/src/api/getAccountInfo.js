import { endpoint } from "./config";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getCSRFToken = async () => {
    //this sets up the CSRF token in the request heads
    const response = await axios.get(`${endpoint}/users/getCSRFToken`);
    axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
}

export const getAccountInfo = async () => {
    //csrf token is requested from the server first to be included in the request to verify the source
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