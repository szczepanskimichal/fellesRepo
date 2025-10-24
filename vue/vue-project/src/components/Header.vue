<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import HeaderLogo from './HeaderLogo.vue'
import DesktopNavigation from './DesktopNavigation.vue'
import MobileNavigation from './MobileNavigation.vue'
import AuthManager from './auth/AuthManager.vue'

defineOptions({
  name: 'AppHeader',
})

const authStore = useAuthStore()
const authManager = ref<InstanceType<typeof AuthManager>>()

const openLogin = () => {
  authManager.value?.openLogin()
}

const openRegister = () => {
  authManager.value?.openRegister()
}

onMounted(async () => {
  try {
    await authStore.initAuth()
  } catch (error) {
    console.warn('Failed to initialize auth:', error)
  }
})
</script>

<template>
  <header class="header">
    <HeaderLogo />
    <DesktopNavigation @open-login="openLogin" @open-register="openRegister" />
    <MobileNavigation @open-login="openLogin" @open-register="openRegister" />
    <AuthManager ref="authManager" />
  </header>
</template>

<style scoped>
header {
  width: 100%;
  background: #d17862;
  color: white;
  display: flex;
  padding: 10px;
  position: sticky;
  z-index: 1000;
}
</style>
