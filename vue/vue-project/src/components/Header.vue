<script setup lang="ts">
defineOptions({
  name: 'AppHeader'
});
</script>

<template>
  <header>
    <img src="/photos/heart.png" alt="Logo"/>
  </header>
</template>

<style scoped>
header{
  width:100%;
  background:#D17862;
  color:white;
  display:flex;
  align-items:center;
  padding:10px;
}
header img {
  height:50px;
}
</style>