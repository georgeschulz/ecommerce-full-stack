import { endpoint } from "./config"
import axios from "axios"

export const getHomeTargets = async () => {
    return await axios.get(`${endpoint}/target/home`)
}

export const getWizardTargets = async () => {
    return await axios.get(`${endpoint}/target/wizard`);
}