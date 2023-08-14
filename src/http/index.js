import axios from 'axios';

const $host = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true
  // headers: {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // },
});

$host.interceptors.request.use(config => {
  if (localStorage.getItem('at') !== null) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('at')}`;
  }

  return config;
});

$host.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config) {
      try {
        const refresh = localStorage.getItem('rt')
        if (refresh) {
          const response = await axios.post('url', {
            refreshToken: refresh,
          });
          if (response.data) {
            localStorage.setItem('at', response.data.data.accessToken);
            return $host.request(originalRequest);
          }
        }
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
