<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/Button.vue'

defineOptions({
  name: 'ResetPasswordModal',
})

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  switchToLogin: []
}>()

const authStore = useAuthStore()

const email = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)

const handleSubmit = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  authStore.clearError()

  const result = await authStore.resetPassword(email.value)

  if (result.success) {
    isSuccess.value = true
  }

  isSubmitting.value = false
}

const closeModal = () => {
  emit('close')
  email.value = ''
  authStore.clearError()
  isSuccess.value = false
}

const handleOverlayClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      authStore.clearError()
      isSuccess.value = false
    }
  },
)
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Reset Password</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      <div class="modal-body">
        <!-- Success Message -->
        <div v-if="isSuccess" class="success-message">
          <div class="success-icon">✓</div>
          <h3>Check Your Email</h3>
          <p>
            We've sent a password reset link to <strong>{{ email }}</strong
            >. Please check your email and follow the instructions to reset your password.
          </p>
          <Button @click="$emit('switchToLogin')" class="submit-btn"> Back to Sign In </Button>
        </div>

        <!-- Reset Form -->
        <div v-else>
          <!-- Error Message -->
          <div v-if="authStore.error" class="error-message">
            {{ authStore.error }}
          </div>

          <div class="reset-info">
            <p>Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="reset-form">
            <div class="form-group">
              <label for="reset-email">Email Address</label>
              <input
                id="reset-email"
                v-model="email"
                type="email"
                placeholder="Enter your email address"
                required
                :disabled="isSubmitting"
              />
            </div>

            <Button type="submit" :disabled="isSubmitting || authStore.loading" class="submit-btn">
              {{ isSubmitting ? 'Sending...' : 'Send Reset Link' }}
            </Button>
          </form>

          <!-- Footer Links -->
          <div class="modal-footer">
            <p>
              Remember your password?
              <button @click="$emit('switchToLogin')" class="link-btn">Back to Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 100%;
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  color: #d17862;
  font-size: 1.5rem;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #d17862;
}

.modal-body {
  padding: 2rem;
}

.success-message {
  text-align: center;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #27ae60;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin: 0 auto 1.5rem;
}

.success-message h3 {
  color: #d17862;
  margin-bottom: 1rem;
}

.success-message p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  border: 1px solid #fcc;
  text-align: center;
}

.reset-info {
  text-align: center;
  margin-bottom: 2rem;
}

.reset-info p {
  color: #666;
  line-height: 1.6;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #d17862;
}

.form-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  margin: 0;
}

.modal-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.link-btn {
  background: none;
  border: none;
  color: #d17862;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.95rem;
}

.link-btn:hover {
  color: #b8654a;
}

.modal-footer p {
  margin: 0;
  color: #666;
}

@media (max-width: 480px) {
  .modal-content {
    margin: 0;
    border-radius: 0;
    height: 100vh;
    max-height: none;
  }

  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }
}
</style>
