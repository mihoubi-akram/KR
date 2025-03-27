import { useAuthStore } from '@/stores/auth';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    redirect: () => {
      const authStore = useAuthStore();
      return authStore.token ? '/home' : '/login';
    } 
  },
  { 
    path: '/login', 
    name: 'login', 
    component: LoginView, 
    meta: { guest: true } 
  },
  { 
    path: '/register', 
    name: 'register', 
    component: RegisterView, 
    meta: { guest: true } 
  },
  { 
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: { guest: true }
  },
  { 
    path: '/reset-password/:token',
    name: 'reset-password',
    props: true, 
    component: ResetPasswordView,
    meta: { guest: true }
  },
  { 
    path: '/home', 
    name: 'home', 
    component: HomeView, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/logout', 
    name: 'logout', 
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore();
      await authStore.logout();
      next('/login');
    } 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.guest && isAuthenticated) {
    next('/home');
  } else {
    next();
  }
})

export default router