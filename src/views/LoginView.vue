<template>
    <div class="login-container">
        <Card class="login-card" >
            <template #header>
            <div class="logo">
                <img src="@/assets/logo.svg" alt="Kitchen Restocker Logo" />
            </div>
            </template>
            
            <template #title>
            <h1 class="title">Log in</h1>
            </template>
            
            <template #subtitle>
            <p class="subtitle">Manage your restaurant menu inventory</p>
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
                    class="w-full"
                    placeholder="exemple: amine@xyz.com"
                    :class="{'p-invalid': submitted && !email}"
                    aria-describedby="email-error"
                    />
                    
                </span>
                <small id="email-error" class="p-error" v-if="submitted && !email"></small>
                </div>
                
                <div class="form-group">
                <div class="label-password">
                    <label for="password">Password</label>
                    <a class="forgot-password" @click="forgotPassword">Forgot password?</a>
                </div>
                <Password 
                    id="password" 
                    v-model="password" 
                    class="w-full" 
                    :feedback="false"
                    :toggleMask="true"
                    :class="{'p-invalid': submitted && !password}"
                    aria-describedby="password-error"
                />
                <small id="password-error" class="p-error" v-if="submitted && !password"></small>
                </div>
                
                <div class="remember-me">
                    <Checkbox id="remember" v-model="rememberMe" :binary="true" />
                    <label for="remember" class="ml-2">Keep me logged in</label>
                </div>
                
                <Button 
                type="submit" 
                label="Log in" 
                class="login-button w-full" 
                :loading="isLoading"
                />
            </form>
            
            <div class="create-account">
                Don't have an account? <a @click="createAccount">Create one</a>
            </div>
            </template>
        </Card>      
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth'; // Assuming you have an auth store with Pinia
  import Card from 'primevue/card';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Checkbox from 'primevue/checkbox';
  import Button from 'primevue/button';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  // Form data
  const email = ref('');
  const password = ref('');
  const rememberMe = ref(false);
  const isLoading = ref(false);
  const submitted = ref(false);
  
  // Form submission
  const handleLogin = async () => {
    submitted.value = true;
    
    // Validate form
    if (!email.value || !password.value) {
      return;
    }
    
    isLoading.value = true;
    
    try {
      await authStore.login({
        email: email.value,
        password: password.value,
        rememberMe: rememberMe.value
      });
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // You could add Toast notification here for errors
    } finally {
      isLoading.value = false;
    }
  };
  
  const forgotPassword = () => {
    router.push('/forgot-password');
  };
  
  const createAccount = () => {
    router.push('/register');
  };
  </script>
  
  <style scoped>
  .login-container {
    background-color: #f5f5f5;
    max-width: 1280px;
    margin:auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    }
    
  .login-card{

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
  :deep(.p-card-body){
    padding: 3rem;
  }
  :deep(.p-card-content){
    margin-top: 50px;
  }
  :deep(.p-password){
    width: 100%;
  }
  :deep(.p-password-input){
    width: 100%;
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
  }
  
  .forgot-password {
    font-size: 12px;
    color: #08C25E;
    cursor: pointer;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    color: #BEBCBC  ;
  }
  
  :deep(.login-button) {
    background-color: #08C25E;
    border-color: #08C25E;
    width: 100%;
    margin-top: 50px;
  }
  
  :deep(.login-button:hover) {
    background-color: #16a34a;
    border-color: #16a34a;
  }
  
  .create-account {
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
  }
  
  .create-account a {
    color: #08C25E;
    cursor: pointer;
    text-decoration: none;
  }

  .input-email{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  </style>