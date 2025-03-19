import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ResetPasswordView from '@/views/resetPasswordView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', name:'login', component: LoginView },
  { path: '/forgot-password',name:'forgot-password', component: ForgotPasswordView },
  { path: '/reset-password' ,name : 'reset-password', component:ResetPasswordView},
  { path: '/register' ,name : 'register', component:RegisterView},
  { path: '/home' ,name : 'HomeView', component:HomeView}
];

 const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
