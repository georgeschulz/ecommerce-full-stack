import { endpoint } from "./config";
import axios from "axios";

export const onSignup = async (signupData) => {
    return await axios.post(`${endpoint}/register`, signupData)
}