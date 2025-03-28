<template>
    <button class="regen-button">
      <img src="@/assets/rotate-right.svg" alt="Regenerate Icon" class="icon" />
      <span>Regenerate</span>
    </button>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .regen-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.625rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #111;
    background-color: white;
    border-radius: 12px;
    border: 0px solid transparent;
    position: relative;
    cursor: pointer;
    transition: 0.3s ease;
  }
  
  .regen-button::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px; /*increase border*/
    border-radius: 12px;
    background: linear-gradient(90deg, #00c853, #ff9800);
    -webkit-mask: linear-gradient(white, white) content-box, linear-gradient(white, white);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  
  .regen-button .icon {
    width: 20px;
    height: 20px;
  }
  
  .regen-button:hover {
    background-color: #f9f9f9;
  }
  </style>
  