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
            <span class="name">{{ authStore.user?.name }}</span>
            <span class="email">{{ authStore.user?.email }}</span>
          </div>  
        </span>
      </SplitButton>
    </div>
  </template>
  
  <script setup>
  import { defineProps} from 'vue';
  import SplitButton from 'primevue/splitbutton';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();
  const handleLogout = async () => {
    await authStore.logout();
    router.push('/login');
  };
  const items = [
    { label: 'Business settings', icon: 'pi pi-briefcase', command: () => {} },
    { label: 'Account settings', icon: 'pi pi-cog', command: () => {} },
    { label: 'Our products', icon: 'pi pi-box', command: () => {} },
    { separator: true },
    { label: 'Log out', icon: 'pi pi-sign-out', command: handleLogout }
  ];
  
  defineProps({
    user: Object
    //items: { type: Array, required: true }
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
  