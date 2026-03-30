// import axios from 'axios';

// const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || '/api' });

// API.interceptors.request.use(config => {
//   const token = localStorage.getItem('adams_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Bypass proxy, go direct
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adams_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
