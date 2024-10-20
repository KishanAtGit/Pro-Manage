import axios from 'axios';

// const serverUrl = process.env.REACT_APP_SERVER_URL;

const apiClient = axios.create({
  baseURL: `http://localhost:5000/api/`,
  // baseURL: `https://pro-manage-backend-ntqu.onrender.com/api/`,
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;
