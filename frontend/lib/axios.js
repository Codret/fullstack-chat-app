import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE ==="development"? "http://localhost:5001/api" : "/api",
    withCredentials: true,
})

