<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'
import ResetPasswordModal from './ResetPasswordModal.vue'

defineOptions({
  name: 'AuthManager',
})

type ModalType = 'login' | 'register' | 'reset' | null

const activeModal = ref<ModalType>(null)

const openLogin = () => {
  activeModal.value = 'login'
}

const openRegister = () => {
  activeModal.value = 'register'
}

const openReset = () => {
  activeModal.value = 'reset'
}

const closeModal = () => {
  activeModal.value = null
}

const switchToRegister = () => {
  activeModal.value = 'register'
}

const switchToLogin = () => {
  activeModal.value = 'login'
}

const switchToReset = () => {
  activeModal.value = 'reset'
}

// Expose methods to parent components
defineExpose({
  openLogin,
  openRegister,
  openReset,
})
</script>

<template>
  <div>
    <!-- Login Modal -->
    <LoginModal
      :is-open="activeModal === 'login'"
      @close="closeModal"
      @switch-to-register="switchToRegister"
      @switch-to-reset="switchToReset"
    />

    <!-- Register Modal -->
    <RegisterModal
      :is-open="activeModal === 'register'"
      @close="closeModal"
      @switch-to-login="switchToLogin"
    />

    <!-- Reset Password Modal -->
    <ResetPasswordModal
      :is-open="activeModal === 'reset'"
      @close="closeModal"
      @switch-to-login="switchToLogin"
    />
  </div>
</template>
