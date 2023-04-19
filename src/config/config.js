import axios from "axios"
import routes from "../routes/routes.json"
import consts from '../consts/constants.json';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8050/api/",
    timeout: 600000
})

export const paths = routes.paths;
export const constants = consts.constants;