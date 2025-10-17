<script setup lang="ts">
</script>
<template>
  <button><slot /></button>
</template>
<style scoped>
/* BUTTON STYLES */
button{
  cursor:pointer;
  background: #D17862;
  color:white;
  font-weight:bold;
  border: 0;
  border-radius:5px;
  padding:5px 15px;
  font-size:1rem;
  transition: transform 0.2s;
  margin: 10px 0;
}
button:hover{
  transform:scale(1.05);
}
/* ----------------- */
</style>