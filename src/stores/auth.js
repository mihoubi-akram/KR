import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/login', credentials);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.user = response.data.user;
        return true;
      } catch (error) {
        console.error('Login error:', error.response.data);
        return false;
      }
    },
    async logout() {
      try {
        await api.post('/logout', null, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.user = null;
        this.token = null;
        localStorage.removeItem('token');
      }
    },
    async requestPasswordReset(email) {
      try {
        await api.post('/forgot-password', { email });
      } catch (error) {
        console.error('Forgot password error:', error.response?.data || error);
        throw new Error(error.response?.data?.email?.[0] || 'Failed to send reset link');
      }
    },

    async completePasswordReset({ email,token, password, password_confirmation }) {
      try {
        await api.post('/reset-password', { email,token, password, password_confirmation });
      } catch (error) {
        throw new Error(
          error.response?.data?.email?.[0] || 
          error.response?.data?.token?.[0] || 
          error.response?.data?.password?.[0] || 
          'Failed to reset password'
        );
      }
    },
    async _getUser1() {
      try {
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = response.data;
      } catch (error) {
        console.error('Fetch user error:', error);
      }
    },
    async getUser() {
      // Don't attempt if no token exists
      if (!this.token) {
        console.warn('No token available to fetch user');
        return null;
      }
  
      try {
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
  
        this.user = response.data;
        return this.user;
      } catch (error) {
        console.error('Failed to fetch user:', error);
  
        // Auto-logout if the token is invalid/expired
        if (error.response?.status === 401) {
          await this.logout();
        }
  
        throw error; // Re-throw for components to handle
      }
    },
    async register(userData) {
      try {
        const response = await api.post('/register', {
          name:userData.name,
          restaurant_name: userData.restaurantName,
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.confirmPassword,
          phone_number: userData.phoneNumber,
          location: userData.location,
        });
  
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.user = response.data.user; 
        return true;
      } catch (error) {
        console.error('Registration error:', error.response?.data || error);
        throw error; // Re-throw the error to handle it in the component
      }
    }
  },
  persist: true,
});
