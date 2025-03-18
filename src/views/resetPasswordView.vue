<template>
    <div class="reset-password-container">
      <Card class="reset-password-card">
        <template #header>
          <div class="logo">
            <img src="@/assets/logo.svg" alt="Kitchen Restocker Logo" />
          </div>
        </template>
        
        <template #title>
          <h1 class="title">Create new password</h1>
        </template>
        
        <template #subtitle>
          <p class="subtitle">Create new password for <span style="font-weight: bold">{{ email }}</span></p>
        </template>
        
        <template #content>
          <form @submit.prevent="handleResetPassword">
            <div class="form-group">
              <div class="input-password">
                <label for="newPassword">New Password</label>
                <Password 
                  id="newPassword" 
                  v-model="newPassword" 
                  class="full-width" 
                  :style="{ width: '100%' }" 
                  :inputStyle="{ width: '100%' }" 
                  :feedback="false"
                  :toggleMask="true"
                  :class="{'p-invalid': submitted && !newPassword}"
                />
              </div>
            </div>
            
            <div class="form-group">
              <div class="input-password">
                <label for="confirmPassword">Confirm Password</label>
                <Password 
                  id="confirmPassword" 
                  v-model="confirmPassword" 
                  class="full-width" 
                  :style="{ width: '100%' }" 
                  :inputStyle="{ width: '100%' }" 
                  :feedback="false"
                  :toggleMask="true"
                  :class="{'p-invalid': submitted && !isPasswordMatch}"
                />
              </div>
            </div>
            
            <div id="error-message" class="p-error" v-if="submitted && errorMessage">
              <span>{{ errorMessage }}</span>
            </div>
            
            <div id="success-message" class="p-success" v-if="submitted && successMessage">
              <span>{{ successMessage }}</span>
            </div>
            
            <Button 
              type="submit" 
              label="Reset Password" 
              class="reset-button w-full" 
              :loading="isLoading"
            />
          </form>
        </template>
      </Card>      
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import Card from 'primevue/card';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  const email = decodeURIComponent(route.query.email || "");
  const token = computed(() => route.query.token || '');
  
  // Form data
  const newPassword = ref('');
  const confirmPassword = ref('');
  const isLoading = ref(false);
  const submitted = ref(false);
  const successMessage = ref('');
  
  const isPasswordMatch = computed(() => {
    return newPassword.value === confirmPassword.value;
  });
  
  const errorMessage = computed(() => {
    if (!newPassword.value) return "New password is required.";
    if (!confirmPassword.value) return "Please confirm your password.";
    if (!isPasswordMatch.value) return "Passwords do not match.";
    if (newPassword.value.length < 8) return "Password must be at least 8 characters long.";
    return "";
  });
  
  // Form submission
  const handleResetPassword = async () => {
    submitted.value = true;
    successMessage.value = '';
    
    // Validate form
    if (errorMessage.value) {
      return;
    }
    
    isLoading.value = true;
    
    try {
      // Assuming your auth store has a completePasswordReset method
      await authStore.completePasswordReset({
        token: token.value,
        newPassword: newPassword.value
      });
      
      // Show success message
      successMessage.value = "Password reset successful.";
      
      // Reset form after a delay, then redirect to login
      setTimeout(() => {
        router.push('login');
      }, 2000);
    } catch (error) {
      console.error('Password reset failed:', error);
      // You could add specific error handling here
    } finally {
      isLoading.value = false;
    }
  };
  

  </script>
  
  <style scoped>
  .reset-password-container {
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
    height: 700px;
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
  }
  
  .form-group label {
    margin-left: 8px;
  }
  
  .input-password {
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
  
  :deep(.p-password.p-invalid > .p-inputtext) {
    border-color: #EB4335;
  }
  </style>