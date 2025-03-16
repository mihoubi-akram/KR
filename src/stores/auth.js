import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', { email, password });
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token);
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    }
  }
});
