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
      <div class="header-container">
        <div class="title">Shopping list has been generated</div>
        <RegenerateButton></RegenerateButton>
      </div>
      <Card class="shopping-list-card">
        <template #content>
          <DataTable
            :value="shoppingItems"
            editMode="cell"
            @cell-edit-complete="onCellEditComplete"
            class=" p-datatable-sm"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        class: [{ '!py-0': state['d_editing'] }]
                    })
                }
            }"
          >
            <Column field="name" header="Item" style="width: 30%">
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" autofocus fluid />
              </template>
            </Column>

            <Column field="store" header="Store" style="width: 40%">
              <template #body="{ data }">
                <Dropdown v-model="data.store" :options="stores" optionLabel="name" 
                  placeholder="Select store" class="store-dropdown">
                  <template #option="slotProps">
                    <div class="store-option">
                      <img v-if="slotProps.option.logo" :alt="slotProps.option.name" 
                        :src="slotProps.option.logo" class="store-logo" />
                      <span class="store-name">{{ slotProps.option.name }}</span>
                    </div>
                  </template>
                </Dropdown>
              </template>
            </Column>

            <Column field="quantity" header="Qty" style="width: 20%;">
                  <template #body="{ data }">
                    <div class="quantity-editor">
                          <Button icon="pi pi-minus" @click="decrement(data)" 
                              class="p-button-rounded p-button-text" />
                          <span class="quantity-value">{{ data.quantity }}</span>
                          <Button icon="pi pi-plus" @click="increment(data)" 
                              class="p-button-rounded p-button-text" />
                      </div>
                  </template>

              </Column>

            <Column style="width: 20%">
              <template #body="{ data }">
                <Button
                  icon="pi pi-trash"
                  class="p-button-text p-button-danger"
                  @click="removeItem(data)"
                />
              </template>
            </Column>

            <template #footer>
              <button @click="addNewItem" class="add-item-button">
                <i class="pi pi-plus"></i> Add new item
              </button>
          </template>
          </DataTable>
        </template>

      
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import ProfileSetting from '@/components/ProfileSetting.vue'
import RegenerateButton from '@/components/RegenerateButton.vue'
import { Column, DataTable, Dropdown, InputNumber, InputText } from 'primevue'

const shoppingItems = ref([
  { name: 'Perrier', store: 'Costco', quantity: 2 },
  { name: 'Zup', store: 'Costco', quantity: 3 },
  { name: 'Coca cola', store: 'Noix Oriental', quantity: 3 },
  { name: 'Orange juice', store: 'Noix Oriental', quantity: 1 },
  { name: 'Coca cola diet', store: 'Costco', quantity: 1 },
  { name: 'Zup diet', store: 'Costco', quantity: 1 },
])

const stores = ref([
  { name: 'Costco', logo: 'https://logo.clearbit.com/costco.com' },
  { name: 'Walmart', logo: 'https://logo.clearbit.com/walmart.com' },
  { name: 'Loblaws', logo: 'https://logo.clearbit.com/loblaws.ca' },
  { name: 'Metro', logo: 'https://logo.clearbit.com/metro.ca' },
  { name: 'Sobeys', logo: 'https://logo.clearbit.com/sobeys.com' }
]);
const onCellEditComplete = (event) => {
  const { data, field, newValue } = event
  data[field] = newValue
}

const removeItem = (item) => {
  shoppingItems.value = shoppingItems.value.filter((i) => i !== item)
}


const increment = (item) => {
  item.quantity++;
};

const decrement = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const addNewItem = () => {
  shoppingItems.value.push({ 
    name: 'New item', 
    store: stores.value[0].name, 
    quantity: 1 
  });
};

const deleteItem = (index) => {
  shoppingItems.value.splice(index, 1);
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
  max-width: 1200px;
  margin: 1rem auto;
  width: 100%;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.25rem 0;
}

.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  /*margin-top: 0.75rem;*/
}
.header-container .title {
  font-weight: 700;
  font-size: 1.5rem;
}

.shopping-list-card {
  width: 100%;
  margin-top: 1.4rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-color);
}

.shopping-list-container {
  padding: 0rem;
}

.shopping-list-header h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.shopping-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--surface-d);
}

.item-details {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.item-store {
  color: var(--text-color-secondary);
}

.item-quantity {
  font-weight: bold;
}

.add-item-section {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.shopping-datatable {
  margin-top: 1rem;
}

/* Custom styling for the table */
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f8f9fa;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.75rem 1rem;
}


.store-dropdown {
  width: 100%;
  min-width: 120px;
}

.store-logo {
    width: 2rem;
    height: 2rem;
    object-fit: contain;
}

/* Adjust dropdown item padding */
:deep(.p-dropdown-item) {
    padding: 0.5rem 1rem;
}

/* Make the dropdown items more compact */
:deep(.p-dropdown-items-wrapper) {
    padding: 0.25rem 0;
}

/* Quantity control adjustments */
.quantity-control {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.qty-btn {
    width: 20px;
    height: 20px;
    padding: 0;
}



/* Each store option in dropdown */
.store-option {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 0.5rem;
}



/* Store name text */
.store-name {
  font-size: 14px;
  white-space: nowrap; /* Prevent text wrapping */
}

/* Dropdown items container */
:deep(.p-dropdown-panel .p-dropdown-items) {
  padding: 0.5rem 0; /* Tighter padding */
}

/* Individual dropdown item */
:deep(.p-dropdown-item) {
  padding: 6px 12px;
  font-size: 14px;
}

/* Highlight on hover */
:deep(.p-dropdown-item:hover) {
  background-color: #f5f5f5;
}
/*
.add-item-button {
  background: none;
  border: none;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  color: var(--p-button-text-primary-color);
  cursor: pointer;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  gap: 0.5rem; 
  transition: all 0.2s ease;
}


.add-item-button:hover {
  background: none;
}

.add-item-button:focus {
  background: none;
  
}

.add-item-button .pi {
  font-size: 14px;
}
*/

.add-item-button {
  /* Basic button styles */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;

  color: var(--p-button-text-primary-color);
  transition: all 0.2s ease;
  
  /* Hover effect */
  &:hover {
    background-color: #f9f7f7;
    color: var(--p-button-text-primary-color);
  }
  

}

/* PrimeIcons styling */
.pi {
  font-size: 14px;
}




:deep(.shopping-datatable .p-datatable-thead > tr > th) {
  text-align: left; /* Explicitly set to left */
  justify-content: flex-start; /* Reset flex alignment */
}

/* Remove any center alignment from header content */
:deep(.shopping-datatable .p-column-header-content) {
  justify-content: flex-start; /* Default alignment */
  display: flex;
}


/**center thead of table */


:deep(.p-datatable-column-header-content) {
  justify-content: center;
}
:deep(.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td) {
  text-align: center;
}
</style>
