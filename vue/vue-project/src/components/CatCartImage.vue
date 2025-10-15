<script setup lang="ts">
defineProps(['cat'])
</script>
<template>
      <img :src="`/photos/${cat.image}`" :alt="cat.name" />
</template>
<style scoped>
/* RECIPE CARD IMAGE STYLES */
img {
  aspect-ratio: 1/1;
  width:100%;
  border-radius:5px;
  cursor:pointer;
  opacity:0.9;
  transition: opacity 0.2s;
}
img:hover{
  opacity:1;
}
/* ----------------- */
</style>