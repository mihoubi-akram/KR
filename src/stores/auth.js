import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/login', credentials);
        if (!response.data.token) {
          throw new Error("No token received");
        }
        this.token = response.data.token;
        this.user = response.data.user;
        return true;
      } catch (error) {
        console.error('Login error:', error.response?.data || error);
        throw error; 
      }
    },
    async logout() {
      try {
        await api.post('/logout', null, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.error('Logout error:', error.response?.data || error);
      } finally {
        this.user = null;
        this.token = null;
      }
    },
    async requestPasswordReset(email) {
      try {
        await api.post('/forgot-password', { email });
      } catch (error) {
        const errorMsg = error.response?.data?.email?.[0] || 'Failed to send reset link';
        throw new Error(errorMsg);
      }
    },

    async completePasswordReset({ email, token, password, password_confirmation }) {
      try {
        await api.post('/reset-password', { 
          email,
          token, 
          password, 
          password_confirmation 
        });
      } catch (error) {
        const errorMsg = error.response?.data?.message || 
                        error.response?.data?.email?.[0] || 
                        'Failed to reset password';
        throw new Error(errorMsg);
      }
    },
    async getUser() {
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
        if (error.response?.status === 401) {
          await this.logout();
        }
        throw error;
      }
    },
    async register(userData) {
      try {
        const response = await api.post('/register', {
          name: userData.name,
          restaurant_name: userData.restaurantName,
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.confirmPassword,
          phone_number: userData.phoneNumber,
          location: userData.location,
        });

        this.token = response.data.token;
        this.user = response.data.user;
        return true;
      } catch (error) {
        console.error('Registration error:', error.response?.data || error);
        throw error;
      }
    }
  },

  persist: {
    paths: ['user', 'token'],
  },
});
