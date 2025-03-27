import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

  api.interceptors.request.use((config) => {
    const token = useAuthStore().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

export default api;
