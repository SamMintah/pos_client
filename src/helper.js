import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(
  config => {
    config.baseURL = process.env.BASE_URL; 
    return config; 
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
