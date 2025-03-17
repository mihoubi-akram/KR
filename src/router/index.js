import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import LoginView from '@/views/LoginView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: LoginView },
  { path: '/forgot-password', component: ForgotPasswordView },
];

 const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
