import axios from 'axios';  
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL_NODE_DEV, VITE_API_STAGE, }=getEnvVariables();

const quoterApiNode = axios.create({ 
    baseURL: VITE_API_STAGE=='dev'
                ? VITE_API_URL_NODE_DEV
                : VITE_API_URL_NODE_DEV
});

//TODO configurar interceptorres
quoterApiNode.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config;
})

export default quoterApiNode;
