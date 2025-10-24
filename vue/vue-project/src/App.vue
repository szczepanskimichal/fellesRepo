<script setup lang="ts">
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
</script>

<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>

<style scoped>
/* Global app styles can go here */
</style>
