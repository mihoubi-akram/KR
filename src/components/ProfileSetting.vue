<template>
    <div class="profile-setting">
      <SplitButton 
        label="Mohamed Benhassir" 
        :model="items" 
        class="p-button-rounded p-button-secondary">
        <template #buttonicon>
          <img src="@/assets/user.svg" alt="User Icon" class="user-icon" />
        </template>
      </SplitButton>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import SplitButton from 'primevue/splitbutton';

  
  const items = [
    {
      label: 'Business settings',
      icon: 'pi pi-briefcase',
      command: () => { /* your command */ },
    },
    {
      label: 'Account settings',
      icon: 'pi pi-cog',
      command: () => { /* your command */ },
    },
    {
      label: 'Our products',
      icon: 'pi pi-box',
      command: () => { /* your command */ },
    },
    {
      label: 'Log out',
      icon: 'pi pi-sign-out',
      command: () => { /* your command */ },
    }
    ];
  </script>
  
  <style scoped>
  .profile-setting {
    display: flex;
    align-items: center;
  }
  
  .user-icon {
    width: 24px;
    height: 24px;
  }
  </style>