<template>
    <div class="forgot-password-container">
      <Card class="forgot-password-card">
        <template #header>
          <div class="logo">
            <img src="@/assets/logo.svg" alt="Kitchen Restocker Logo" />
          </div>
        </template>
        
        <template #title>
          <h1 class="title">Reset password</h1>
        </template>
        
        <template #subtitle>
          <p class="subtitle">Enter your email address to receive a password reset link.</p>
        </template>
        
        <template #content>
          <form @submit.prevent="handleForgotPassword">
            <div class="form-group">
              <span class="input-email">
                <label for="email">Email</label>
                <InputText 
                  id="email" 
                  v-model="email" 
                  type="email"
                  placeholder="amine@xyz.com"
                  :class="{'p-invalid': submitted && !email}"
                  aria-describedby="email-error"
                />
              </span>
            </div>
            
            <div id="error-message" class="p-error" v-if="submitted && errorMessage">
              <span>{{ errorMessage }}</span>
            </div>
            
            <div id="success-message" class="p-success" v-if="submitted && successMessage">
              <span>{{ successMessage }}</span>
            </div>
            
            <Button 
              type="submit" 
              label="Send Reset Link" 
              class="reset-button w-full" 
              :loading="isLoading"
            />
            
            <Button 
              label="< Back" 
              class="back-button w-full" 
              @click="backToLogin"
              :disabled="isLoading"
              variant="text"
              severity="contrast"
            />
          </form>
        </template>
      </Card>      
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import Card from 'primevue/card';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  const email = ref('');
  const isLoading = ref(false);
  const submitted = ref(false);
  const successMessage = ref('');
  
  const errorMessage = computed(() => {
    if (!email.value) return "Email is required.";
    if (!isValidEmail.value) return "Please provide a valid email address.";
    return "";
  });
  
  const isValidEmail = computed(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.value);
  });
  
  // Form submission
  const handleForgotPassword = async () => {
    submitted.value = true;
    successMessage.value = '';
    
    // Validate form
    if (!email.value || !isValidEmail.value) {
      return;
    }
    
    isLoading.value = true;
    
    try {
      // Assuming your auth store has a resetPassword method
      await authStore.resetPassword(email.value);
      
      // Show success message
      successMessage.value = `Reset link sent to ${email.value}. Please check your inbox.`;
      
      // Reset form
      email.value = '';
      submitted.value = false;
    } catch (error) {
      console.error('Password reset request failed:', error);
      // You could add specific error handling here
    } finally {
      isLoading.value = false;
    }
  };
  
  const backToLogin = () => {
    router.push('/login');
  };
  </script>
  
  <style scoped>
  .forgot-password-container {
    background-color: #f5f5f5;
    max-width: 1280px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  :deep(.p-card) {
    border-radius: 20px;
    height: 600px;
    width: 600px;
    padding: 50px 60px;
  }
  
  :deep(.p-card-body) {
    padding: 1.5rem;
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

    label{
      margin-left: 8px;
    }
  }
  
  .input-email {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .p-error {
    color: #EB4335;
    margin-bottom: 10px;
  }
  
  .p-success {
    color: #08C25E;
    margin-bottom: 10px;
  }
  
  :deep(.reset-button) {
    background-color: #08C25E;
    border-color: #08C25E;
    width: 100%;
    margin-top: 50px;
  }
  
  :deep(.reset-button:hover) {
    background-color: #16a34a;
    border-color: #16a34a;
  }
  
  :deep(.back-button) {
    width: 100%;
    margin-top: 15px;
  }
  </style>