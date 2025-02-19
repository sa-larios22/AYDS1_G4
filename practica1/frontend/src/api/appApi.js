import axios from 'axios';
import { getEnvVariables } from '../helpers'

const { VITE_API_URL } = getEnvVariables();

export const appApi = axios.create({
    baseURL: VITE_API_URL,
});

appApi.interceptors.request.use( config =>  {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return config;
})

export default appApi;