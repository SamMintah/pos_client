import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(
  config => {
    console.log('BASE_URL:', process.env.REACT_APP_BASE_URL); // Add this line for debugging
    config.baseURL = process.env.REACT_APP_BASE_URL;
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default api;
