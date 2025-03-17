<template>
  <div class="register-container">
    <Card class="register-card">
      <template #header>
        <div class="logo">
          <img src="@/assets/logo.svg" alt="Kitchen Restocker Logo" />
        </div>
      </template>
      
      <template #title>
        <h1 class="title">Create account</h1>
      </template>
      
      <template #subtitle>
        <p class="subtitle">Manage your restaurant menu inventory</p>
      </template>
      
      <template #content>
        <form @submit.prevent="nextStep">
          <!-- Step 1: Account Creation -->
          <div v-if="currentStep === 1">
            <div class="form-group">
              <span class="input-email">
                <label for="email">Email</label>
                <InputText 
                  id="email" 
                  v-model="email" 
                  type="email"
                  placeholder="example-email@xyz.com"
                  :class="{'p-invalid': submitted && !email}"
                  aria-describedby="email-error"
                />
                <small v-if="submitted && !email" id="email-error" class="p-error">Email is required.</small>
                <small v-else-if="submitted && !isValidEmail" id="email-format-error" class="p-error">Please provide a valid email address.</small>
              </span>
            </div>
            
            <div class="form-group">
              <span class="input-password">
                <label for="password">Password</label>
                <Password 
                  id="password" 
                  v-model="password" 
                  class="full-width" 
                  :style="{ width: '100%' }" 
                  :inputStyle="{ width: '100%' }" 
                  :toggleMask="true"
                  :class="{'p-invalid': submitted && !password}"
                />
                <small v-if="submitted && !password" id="password-error" class="p-error">Password is required.</small>
              </span>
            </div>
            
            <div class="form-group">
              <span class="input-password">
                <label for="confirmPassword">Confirm your password</label>
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
                <small v-if="submitted && !confirmPassword" id="confirm-password-error" class="p-error">Please confirm your password.</small>
                <small v-else-if="submitted && !isPasswordMatch" id="password-match-error" class="p-error">Passwords do not match.</small>
              </span>
            </div>
            
            <div id="error-message" class="p-error" v-if="submitted && errorMessage">
              <span>{{ errorMessage }}</span>
            </div>
            
            <Button 
              type="submit" 
              label="Next" 
              class="next-button w-full" 
              :loading="isLoading"
            />
          </div>
          
          <!-- Step 2: Business Details -->
          <div v-if="currentStep === 2">
            <div class="form-group">
              <span class="input-field">
                <label for="restaurantName">Restaurant's name</label>
                <InputText 
                  id="restaurantName" 
                  v-model="restaurantName" 
                  placeholder="Your restaurant name"
                  :class="{'p-invalid': submitted && !restaurantName}"
                />
                <small v-if="submitted && !restaurantName" id="restaurant-name-error" class="p-error">Restaurant name is required.</small>
              </span>
            </div>
            
            <div class="form-group">
              <span class="input-field">
                <label for="phoneNumber">Phone number</label>
                <InputText 
                  id="phoneNumber" 
                  v-model="phoneNumber" 
                  placeholder="XXX XXX XXXX"
                  :class="{'p-invalid': submitted && !phoneNumber}"
                />
                <small v-if="submitted && !phoneNumber" id="phone-error" class="p-error">Phone number is required.</small>
              </span>
            </div>
            
            <div class="form-group">
              <span class="input-field">
                <label for="location">Location</label>
                <InputText 
                  id="location" 
                  v-model="location" 
                  placeholder="Location"
                  :class="{'p-invalid': submitted && !location}"
                />
                <small v-if="submitted && !location" id="location-error" class="p-error">Location is required.</small>
              </span>
            </div>
            
            <div class="form-group">
              <span class="input-field">
                <label for="preferredSuppliers">Preferred suppliers</label>
                <Dropdown 
                  id="preferredSuppliers" 
                  v-model="preferredSuppliers" 
                  :options="supplierOptions" 
                  optionLabel="name" 
                  placeholder="Select" 
                  class="w-full"
                />
              </span>
            </div>
            
            <div class="add-another-link">
              <a @click="showAddSupplierDialog = true">
                <i class="pi pi-plus"></i> Add another sub-restaurant
              </a>
            </div>
            
            <div class="button-group">
              <Button 
                type="button" 
                label="Back" 
                class="back-button p-button-outlined" 
                @click="currentStep = 1"
              />
              <Button 
                type="submit" 
                label="Create" 
                class="create-button" 
                :loading="isLoading"
                @click="handleRegister"
              />
            </div>
          </div>
        </form>
        
        <div class="login-link" v-if="currentStep === 1">
          Already have an account? <a @click="goToLogin">Log In</a>
        </div>
      </template>
    </Card>
    
    <!-- Dialog for adding sub-restaurant -->
    <Dialog 
      v-model:visible="showAddSupplierDialog" 
      modal 
      header="Add Sub-Restaurant" 
      :style="{width: '450px'}"
    >
      <div class="form-group">
        <span class="input-field">
          <label for="subRestaurantName">Sub-Restaurant Name</label>
          <InputText 
            id="subRestaurantName" 
            v-model="subRestaurantName" 
            class="w-full"
          />
        </span>
      </div>
      <div class="dialog-footer">
        <Button 
          label="Cancel" 
          icon="pi pi-times" 
          @click="showAddSupplierDialog = false" 
          class="p-button-text"
        />
        <Button 
          label="Add" 
          icon="pi pi-check" 
          @click="addSubRestaurant" 
          class="p-button-success"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';

const router = useRouter();
const authStore = useAuthStore();

// Form steps
const currentStep = ref(1);
const submitted = ref(false);
const isLoading = ref(false);
const showAddSupplierDialog = ref(false);

// Step 1: Account Creation
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Step 2: Business Details
const restaurantName = ref('');
const phoneNumber = ref('');
const location = ref('');
const preferredSuppliers = ref(null);
const subRestaurantName = ref('');

// Supplier options
const supplierOptions = ref([
  { name: 'Supplier 1', code: 'S1' },
  { name: 'Supplier 2', code: 'S2' },
  { name: 'Supplier 3', code: 'S3' },
]);

// Computed properties for validation
const isValidEmail = computed(() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.value);
});

const isPasswordMatch = computed(() => {
  return password.value === confirmPassword.value;
});

const errorMessage = computed(() => {
  if (currentStep.value === 1) {
    if (!email.value && !password.value && !confirmPassword.value) {
      return "Please complete all fields";
    }
    if (!isValidEmail.value && email.value) {
      return "Please provide a valid email address";
    }
    if (password.value && confirmPassword.value && !isPasswordMatch.value) {
      return "Passwords do not match";
    }
  }
  return "";
});

// Navigation functions
const nextStep = () => {
  submitted.value = true;
  
  if (currentStep.value === 1) {
    // Validate step 1
    if (!email.value || !password.value || !confirmPassword.value || !isValidEmail.value || !isPasswordMatch.value) {
      return;
    }
    
    // Proceed to step 2
    currentStep.value = 2;
    submitted.value = false;
  }
};

const handleRegister = async () => {
  submitted.value = true;
  
  // Validate step 2
  if (!restaurantName.value || !phoneNumber.value || !location.value) {
    return;
  }
  
  isLoading.value = true;
  
  try {
    await authStore.register({
      email: email.value,
      password: password.value,
      restaurantName: restaurantName.value,
      phoneNumber: phoneNumber.value,
      location: location.value,
      preferredSuppliers: preferredSuppliers.value
    });
    
    // Redirect to dashboard after successful registration
    router.push('dashboard');
  } catch (error) {
    console.error('Registration failed:', error);
    // Could add Toast notification here for errors
  } finally {
    isLoading.value = false;
  }
};

const goToLogin = () => {
  router.push('login');
};

const addSubRestaurant = () => {
  if (subRestaurantName.value) {
    supplierOptions.value.push({
      name: subRestaurantName.value,
      code: 'SUB' + (supplierOptions.value.length + 1)
    });
    subRestaurantName.value = '';
    showAddSupplierDialog.value = false;
  }
};
</script>

<style scoped>
.register-container {
  background-color: #f5f5f5;
  max-width: 1280px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

:deep(.register-card) {
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
}

.form-group label {
  margin-left: 8px;
  display: block;
  margin-bottom: 5px;
}

.input-email,
.input-password,
.input-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.p-error {
  color: #EB4335;
}

:deep(.next-button),
:deep(.create-button) {
  background-color: #08C25E;
  border-color: #08C25E;
  width: 100%;
  margin-top: 20px;
}

:deep(.back-button) {
  border-color: #08C25E;
  color: #08C25E;
}

:deep(.next-button:hover),
:deep(.create-button:hover) {
  background-color: #16a34a;
  border-color: #16a34a;
}

.login-link {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}

.login-link a {
  color: #08C25E;
  cursor: pointer;
  text-decoration: none;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.button-group .back-button {
  flex: 1;
}

.button-group .create-button {
  flex: 2;
}

.add-another-link {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.add-another-link a {
  color: #08C25E;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

:deep(.p-password.p-invalid > .p-inputtext) {
  border-color: #EB4335;
}

:deep(.p-inputtext.p-invalid) {
  border-color: #EB4335;
}
</style>