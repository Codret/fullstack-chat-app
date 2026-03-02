// import axios from 'axios';
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// axios.defaults.withCredentials = true;

// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.MODE ==="development"? "http://localhost:5001/api" : "/api",
//     // baseURL: "https://fullstack-chat-app-uyn3.onrender.com",
//     withCredentials: true,
// })

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fullstack-chat-app-uyn3.onrender.com/api",
  withCredentials: true,
});
