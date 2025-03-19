<template>
    <div class="profile-setting">
      <SplitButton 
        :model="items"
        text 
        severity="contrast"
        class="p-button-rounded p-button-secondary"
      >
        <span class="profile-items">
          <img  src="@/assets/user.svg" />
          <div class="profile-info">
            <span class="name">{{ user.name }}</span>
            <span class="email">{{ user.email }}</span>
          </div>  
        </span>
      </SplitButton>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import SplitButton from 'primevue/splitbutton';
  
  defineProps({
    user: { 
      type: Object, 
      required: true,
      default: () => ({
        name: 'Guest User',
        email: 'guest@example.com',
        image: '/default-user.svg'
      })
    },
    items: { type: Array, required: true }
  });
  </script>
  
  <style scoped>

  .p-splitbutton {
    width: 300px;
    justify-content: space-between;
  }
  .profile-setting {
    display: flex;
    align-items: center;
  }
  .profile-items {
    display: flex;
    align-items: center;
  }
  .profile-items img {
    width: 2.7rem;
    margin-right: 0.7rem;
  }
  .p-button-secondary {
    background: var(--p-button-primary-color);
    border: 1px solid var(--p-button-secondary-border-color);
    border-radius: 20px;
  }
  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .name {
    font-size: 0.9rem;
    font-weight: 700;
  }
  .email {
    font-size: 0.75rem;
    color: #BEBCBC;
  }
  
:deep(.p-splitbutton .p-splitbutton-button:not(:disabled):hover),
:deep(.p-splitbutton .p-splitbutton-dropdown:not(:disabled):hover) {
  background-color: white !important;
  border-color: white !important;
}

  </style>
  