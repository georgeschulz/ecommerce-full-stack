import { endpoint } from "./config"
import axios from "axios"
axios.defaults.withCredentials = true;

export const getHomeTargets = async () => {
    return await axios.get(`${endpoint}/target/home`)
}

export const getWizardTargets = async () => {
    return await axios.get(`${endpoint}/target/wizard`);
}

export const getPestList = async () => {
    return await axios.get(`${endpoint}/target/select`);
}