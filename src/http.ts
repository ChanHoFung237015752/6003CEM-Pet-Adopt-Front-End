import axios from 'axios';


export const BACKEND_URL = 'http://localhost:3002';
const authedRequest = axios.create();

authedRequest.interceptors.request.use((config) => {
    config.url = BACKEND_URL + config.url;
    config.headers.Authorization = `Bearer ${localStorage.getItem('JWT')}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export {
    authedRequest
}