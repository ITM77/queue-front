import axios from 'axios';

const $host = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  // },
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
        console.log('sf');
        localStorage.removeItem('at');
        localStorage.removeItem('rt');
        window.location.reload();
      }
    }
    throw error;
  }
);

export default $host;
