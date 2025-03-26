<template>
  <div class="register-container">
    <div class="register-layout">
      <!-- Left side with steps -->
      <div class="steps-container">
        <div class="step-item" :class="[currentStep === 1 ? 'active' : 'inactive']">
          <div class="step-icon">
            <img src="@/assets/user.svg" alt="" />
          </div>
          <div class="step-text">
            <div class="step-title">Create account</div>
            <div class="step-description">Provide your email and password</div>
          </div>
        </div>
        <div class="step-divider"></div>
        <div class="step-item" :class="[currentStep === 2 ? 'active' : 'inactive']">
          <div class="step-icon">
            <img src="@/assets/businessdetail.svg" alt="" />
          </div>
          <div class="step-text">
            <div class="step-title">Your business details</div>
            <div class="step-description">Restaurant name, address and more</div>
          </div>
        </div>
      </div>

      <!-- Right side with form -->
      <div class="form-container">
        <div class="form-header">
          <img src="@/assets/logo.svg" alt="Kitchen Restocker Logo" class="logo" />

          <h1 class="title">Create account</h1>
          <p class="subtitle">Centralize your restocking needs</p>
        </div>

        <form @submit.prevent="handleNext">
          <!-- Step 1: Account Creation -->
          <div v-if="currentStep === 1" class="form-content">
            <div class="form-group">
              <label for="name">Name</label>
              <InputText
                id="name"
                v-model="name"
                type="name"
                placeholder=""
                :class="{ 'p-invalid': submitted && !email }"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <InputText
                id="email"
                v-model="email"
                type="email"
                placeholder="amine@xyz.com"
                :class="{ 'p-invalid': submitted && !email }"
              />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <Password
                id="password"
                v-model="password"
                :feedback="false"
                :toggleMask="true"
                :class="{ 'p-invalid': submitted && !password }"
              />
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm your password</label>
              <Password
                id="confirmPassword"
                v-model="confirmPassword"
                :feedback="false"
                :toggleMask="true"
                :class="{ 'p-invalid': submitted && !passwordsMatch }"
              />
            </div>

            <Button
              type="submit"
              label="Next"
              class="p-button-success next-button"
              :loading="loading"
            />

            <div class="login-link">
              Already have an account? <a @click="goToLogin" class="login-text">Log in</a>
            </div>
          </div>

          <!-- Step 2: Business Details -->
          <div v-if="currentStep === 2" class="form-content">
            <div class="form-group">
              <label for="restaurantName">Restaurant's name</label>
              <InputText
                id="restaurantName"
                v-model="restaurantName"
                placeholder="Your restaurant name"
                :class="{ 'p-invalid': submitted && !restaurantName }"
              />
            </div>

            <div class="form-group">
              <label for="phoneNumber">Phone number</label>
              <InputText
                id="phoneNumber"
                v-model="phoneNumber"
                placeholder="XXX XXX XXXX"
                :class="{ 'p-invalid': submitted && !phoneNumber }"
              />
            </div>

            <div class="form-group">
              <label for="location">Location</label>
              <InputText
                id="location"
                v-model="location"
                placeholder="Location"
                :class="{ 'p-invalid': submitted && !location }"
              />
            </div>
            <div class="add-another-link">
              <a @click="showAddSupplierDialog = true">
                <img src="@/assets/add-circle.svg" />
                Add another sub-restaurant
              </a>
            </div>
            <div class="form-group">
              <MultiSelect
                v-model="preferredSuppliers"
                id="preferredSuppliers"
                :options="supplierOptions"
                optionLabel="name"
                filter
                display="chip"
                placeholder="Select suppliers"
                class="w-full md:w-80"
              />
            </div>
            <div class="button-group">
              <Button
                type="submit"
                label="Create"
                class="p-button-success create-button"
                :loading="loading"
              />
              <Button
                type="button"
                label="< Back"
                class="p-button-outlined back-button"
                @click="goBack"
                severity="contrast"
                variant="text"
              />
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Dialog for adding sub-restaurant -->
    <Dialog
      v-model:visible="showAddSupplierDialog"
      modal
      header="Add Sub-Restaurant"
      :style="{ width: '450px' }"
    >
      <div class="form-content">
        <div class="form-group">
          <label for="subRestaurantName">Sub-Restaurant Name</label>
          <InputText id="subRestaurantName" v-model="subRestaurantName" class="w-full" />
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone number</label>
          <InputText
            id="phoneNumber"
            v-model="phoneNumber"
            placeholder="XXX XXX XXXX"
            :class="{ 'p-invalid': submitted && !phoneNumber }"
          />
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <InputText
            id="location"
            v-model="location"
            placeholder="Location"
            :class="{ 'p-invalid': submitted && !location }"
          />
        </div>
      </div>
      <div class="dialog-footer">
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="showAddSupplierDialog = false"
          class="p-button-text"
        />
        <Button label="Add" icon="pi pi-check" @click="addSubRestaurant" class="p-button-success" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { MultiSelect } from 'primevue'

const router = useRouter()
const authStore = useAuthStore()

// Steps
const currentStep = ref(1)
const submitted = ref(false)
const loading = ref(false)
const showAddSupplierDialog = ref(false)

// Step 1 data
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Step 2 data
const restaurantName = ref('')
const phoneNumber = ref('')
const location = ref('')
const preferredSuppliers = ref(null)
const subRestaurantName = ref('')

// Supplier options
const supplierOptions = ref([
  { name: 'Supplier 1', code: 'S1' },
  { name: 'Supplier 2', code: 'S2' },
  { name: 'Supplier 3', code: 'S3' },
])

// Computed properties
const passwordsMatch = computed(() => {
  return !confirmPassword.value || password.value === confirmPassword.value
})

// Methods
const handleNext = async () => {
  submitted.value = true

  if (currentStep.value === 1) {
    // Validate step 1
    if (!email.value || !password.value || !confirmPassword.value) {
      return
    }

    if (password.value !== confirmPassword.value) {
      return
    }

    // Proceed to step 2
    currentStep.value = 2
    submitted.value = false
  } else if (currentStep.value === 2) {
    // Validate step 2
    if (!restaurantName.value || !phoneNumber.value || !location.value) {
      return
    }

    // Register the account
    loading.value = true

    try {
      const user = await authStore.register({
        email: email.value,
        name:name.value,
        restaurantName: restaurantName.value,
        password: password.value,
        confirmPassword : confirmPassword.value,
        phoneNumber: phoneNumber.value,
        location: location.value,
      })
      //preferredSuppliers: preferredSuppliers.value,

      router.push({ name: 'home', params: { userId: user.id } });
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      loading.value = false
    }
  }
}

const goBack = () => {
  currentStep.value = 1
  submitted.value = false
}

const goToLogin = () => {
  router.push('/login')
}

const addSubRestaurant = () => {
  if (subRestaurantName.value) {
    supplierOptions.value.push({
      name: subRestaurantName.value,
      code: 'SUB' + (supplierOptions.value.length + 1),
    })
    subRestaurantName.value = ''
    showAddSupplierDialog.value = false
  }
}
</script>

<style scoped>
.register-container {
  background-color: #f5f5f5;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-layout {
  display: flex;
  width: 900px;
  height: 700px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Left side with steps */
.steps-container {
  width: 350px;
  padding: 30px;
  border-right: 1px dashed #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 18.5rem;
  height: 4rem;
  border: 2px solid #fafafa;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.step-item.active {
  color: #000;
  font-weight: 500;
}

.step-item.inactive {
  color: #b0b0b0;
  opacity: 0.5;
  font-weight: 400;
}

.step-item.inactive .step-icon {
  background-color: #9ca3af;
  border: 1px solid #e5e7eb;
  color: #9ca3af;
}
.step-item.inactive .step-text {
  color: #9ca3af;
}

.step-icon {
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}

.step-text {
  display: flex;
  flex-direction: column;
}

.step-title {
  font-weight: 700;
  color: #1e1e1e;
  font-size: 0.9rem;
}

.step-description {
  font-size: 12px;
  color: #bebcbc;
}

.step-divider {
  width: 2px;
  height: 40px;
  background-color: #e0e0e0;
  margin-left: 18px;
}

/* Right side with form */
.form-container {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  height: 40px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 14px;
  color: #333;
  margin-left: 5px;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.login-text {
  color: #08c25e;
  cursor: pointer;
  text-decoration: none;
}

.next-button {
  margin-top: 20px;
  width: 100%;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.back-button {
  flex: 1;
  border-color: #08c25e;
  color: #08c25e;
}

.create-button {
  flex: 2;
}

.add-another-link {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  img {
    width: 1.25rem;
  }
}

.add-another-link a {
  color: #bebcbc;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}
.suppliers-tags {
  display: flex;
  margin-top: 5px;
  gap: 5px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

:deep(.p-password input) {
  width: 100%;
}

:deep(.p-password.p-component) {
  width: 100%;
}

:deep(.p-inputtext) {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
}

:deep(.p-inputtext.p-invalid) {
  border-color: #eb4335;
}

:deep(.p-button) {
  padding: 10px;
  border-radius: 6px;
}

:deep(.p-button-success) {
  background-color: #08c25e;
  border-color: #08c25e;
}

:deep(.p-button-success:hover) {
  background-color: #06a950;
  border-color: #06a950;
}
</style>
