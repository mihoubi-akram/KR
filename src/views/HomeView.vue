<template>
  <div class="home-container">
    <!-- Header with profile -->
    <div class="header">
      <div class="logo-profile">
        <ProfileSetting />
      </div>
    </div>

    <!-- Main content -->
    <div class="content-container">
      <!-- Logo -->
      <div class="logo-container">
        <img src="@/assets/logo.svg" class="logo" />
      </div>

      <!-- Create shopping list heading -->
      <h1 class="subtitle">Create your shopping list</h1>

      <div  class="input-section">
          <InputText 
            v-model="shoppingItem" 
            placeholder="Example: '5 egg boxes from Costco'..." 
            class="shopping-input" 
          />
          <Button class="cameraBtn"  >
            <img src="@/assets/camera.svg" alt="Logo" />
          </Button>
      </div>
      <!-- Recent shopping lists section -->
      <div v-if="shoppingLists.length > 0" class="recent-lists-container">
        <div class="recent-lists-header">
          <span class="recent-title">Your latest shopping lists</span>
          <button class="see-all-btn">See full list</button>
        </div>

        <div class="lists-container">
          <div v-for="(list, index) in shoppingLists" :key="index" class="list-item">
            <div class="list-details">
              <div class="list-date">{{ list.date }}</div>
              <div class="list-body">
                <div class="list-content">{{ list.content }}</div>
                <Button label="View details" class="p-button-text p-button-success view-details-button" />
              </div>

            </div>
            <button class="reuse-button">Reuse</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProfileSetting from '@/components/ProfileSetting.vue';
import { Button,InputText } from 'primevue';

const shoppingItem = ref('');

const shoppingLists = ref([
  {
    date: '11/09/2025',
    content: '4kg of carrots, 5kg of potatos, 2kg of tomatoes...',
  },
  {
    date: '11/08/2025',
    content: '1kg of carrots, 5kg of potatos, 2kg of tomatoes...',
  },
  {
    date: '11/07/2025',
    content: '3kg of carrots, 5kg of potatos, 2kg of tomatoes...',
  }
]);

const addItem = () => {
  // Add item logic here
  shoppingItem.value = '';
};







</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /*background-color: #f5f7f8;*/
  padding: 20px;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  max-width: 700px;
  margin: 1.25rem auto;
  width: 100%;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.25rem 0;
}

.subtitle {
  font-size: 2rem;
  font-weight: 700;
  color: #1E1E1E;
  margin-bottom: 1.2rem;
}

.input-section {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.shopping-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
}











.recent-lists-container {
  width: 100%;
  background-color: white;
  border: 1px solid rgba(217, 217, 217, 1);
  padding:1rem;
  border-radius:0.625rem;
}

.recent-lists-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recent-title {
  font-weight: 600;
}

.see-all-btn {
  background: none;
  font-size: 16px;
  color: #BEBCBC;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  outline: none;
}

.lists-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #FAFAFA;
  border-radius: 10px;
  border: 1px solid rgba(217, 217, 217, 1)
}

.list-date {
  font-weight: 600;
  color: #1E1E1E;
  margin-bottom: 0.625rem;
}
.list-body{
  display: flex;
  gap: 10px;
}
.list-content {
  color: #1e1e1e;
}

.view-details-button {
  padding: 0;
  color: #22c55e;
}

.reuse-button {
  color: white;
  border-radius: 6px;
  background-color: #1e1e1e;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  width: 5rem;
  padding: 0.5rem;
}

.cameraBtn{
  width: 3.125rem;
}
:deep(.p-button) {
  border-radius: 8px;
  background-color: white;
  border-color: #D9D9D9;
}

:deep(.p-inputtext) {
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(217, 217, 217, 1);
  border-radius:0.625rem;
}



:deep(.p-button:not(:disabled):hover) {
  background-color: white !important;
  border-color: white !important;
  color: #333 !important;
}

@media (max-width: 768px) {
  .title {
    font-size: 20px;
  }
  
  .subtitle {
    font-size: 24px;
  }
}
</style>