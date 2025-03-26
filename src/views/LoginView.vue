<template>
  <div class="login-container">
    <Card class="login-card">
      <template #header>
        <div class="logo">
          <img src="@/assets/logo.svg" alt="Kitchen Restocker Logo" />
        </div>
      </template>

      <template #title>
        <h1 class="title">Log in</h1>
      </template>

      <template #subtitle>
        <p class="subtitle">Centralize your restocking needs</p>
      </template>

      <template #content>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <span class="input-email">
              <label for="email">Email</label>
              <InputText
                id="email"
                v-model="email"
                type="email"
                placeholder="amine@xyz.com"
                :class="{ 'p-invalid': submitted && !email }"
                aria-describedby="email-error"
              />
            </span>
          </div>

          <div class="form-group">
            <div class="label-password">
              <label for="password">Password</label>
              <a class="forgot-password" @click="forgotPassword">Forgot password?</a>
            </div>
            <Password
              id="password"
              v-model="password"
              class="full-width"
              :style="{ width: '100%' }"
              :inputStyle="{ width: '100%' }"
              :feedback="false"
              :toggleMask="true"
              :class="{ 'p-invalid': submitted && !password }"
            />
          </div>

          <div class="remember-me">
            <Checkbox id="remember" v-model="rememberMe" :binary="true" />
            <label for="remember" class="ml-2">Keep me logged in</label>
          </div>
          <div id="error-message" class="p-error" v-if="submitted && errorMessage">
            <span>{{ errorMessage }}</span>
          </div>
          <Button type="submit" label="Log in" class="login-button w-full" :loading="isLoading" />
        </form>

        <div class="create-account">
          Don't have an account? <a @click="createAccount">Create one</a>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const submitted = ref(false)
const errorMessage = ref('')
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const setError = (msg) => {
  errorMessage.value = msg
  submitted.value = true
}

// Form submission
const handleLogin = async () => {
  submitted.value = true

  if (!email.value) {
    setError('Email is required.')
    return
  }
  if (!isValidEmail(email.value)) {
    setError('Please provide a valid email address.')
    return
  }
  if (!password.value) {
    setError('Password is required.')
    return
  }
  isLoading.value = true

  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    })
    if (success) {
      router.push('home'); // Navigate to home on successful login
    } else {
      setError('Invalid email or password.');
    }
  } catch (error) {
    setError('An unexpected error occurred. Please try again later.');
  } finally {
    isLoading.value = false;
  }
}

const forgotPassword = () => {
  router.push('forgot-password')
}

const createAccount = () => {
  router.push('register')
}
</script>

<style scoped>
.login-container {
  background-color: #f5f5f5;
  max-width: 1280px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.label-password {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

:deep(.p-card) {
  border-radius: 20px;
  height: 700px;
  width: 600px;
  padding: 50px 70px;
}
:deep(.p-card-body) {
  padding: 3rem;
}
:deep(.p-card-content) {
  margin-top: 50px;
}

.logo {
  display: flex;
  justify-content: center;
}

.logo img {
  height: 50px;
}

.title {
  font-family: 'lato';
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: #212427;
}

.subtitle {
  color: #666;
  font-size: 15px;
  text-align: center;
  color: #212427;
}

.form-group {
  margin-bottom: 20px;

  label {
    margin-left: 8px;
  }
}

.forgot-password {
  font-size: 12px;
  color: #08c25e;
  cursor: pointer;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: #bebcbc;
}

:deep(.login-button) {
  background-color: #08c25e;
  border-color: #08c25e;
  width: 100%;
  margin-top: 50px;
}

.create-account {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}

.create-account a {
  color: #08c25e;
  cursor: pointer;
  text-decoration: none;
}

.input-email {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.p-error {
  color: #eb4335;
}

:deep(.login-button:hover) {
  background-color: #16a34a;
  border-color: #16a34a;
}

:deep(.p-password.p-invalid > .p-inputtext) {
  border-color: #eb4335;
}
</style>