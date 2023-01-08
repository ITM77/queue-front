import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

$host.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('at')}`;
  return config;
});

$host.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
          refresh: localStorage.getItem('rt'),
        });
        localStorage.setItem('at', response.data.access);
        localStorage.setItem('rt', response.data.refresh);
        return $host.request(originalRequest);
      } catch (e) {
        localStorage.removeItem('at');
        localStorage.removeItem('rt');
        window.location.reload();
      }
    }
    throw error;
  }
);

export default $host;
