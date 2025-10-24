<script setup lang="ts">
defineOptions({
  name: 'HeaderLogo',
})
</script>

<template>
  <div class="header-content">
    <img src="/photos/heart.png" alt="Logo" />
    <span>Cat Adoption Center</span>
  </div>
</template>

<style scoped>
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 1rem 20px;
}
.header-content img {
  height: 50px;
}
</style>
