<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/Button.vue'

defineOptions({
  name: 'RegisterModal',
})

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  switchToLogin: []
}>()

const authStore = useAuthStore()

const form = ref({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)
const passwordMismatch = ref(false)

const validatePasswords = () => {
  passwordMismatch.value =
    form.value.password !== form.value.confirmPassword && form.value.confirmPassword.length > 0
}

const handleSubmit = async () => {
  if (isSubmitting.value) return

  validatePasswords()
  if (passwordMismatch.value) return

  isSubmitting.value = true
  authStore.clearError()

  const result = await authStore.register(
    form.value.email,
    form.value.password,
    form.value.displayName,
  )

  if (result.success) {
    emit('close')
    form.value = { displayName: '', email: '', password: '', confirmPassword: '' }
  }

  isSubmitting.value = false
}

const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
  authStore.clearError()

  let result
  switch (provider) {
    case 'google':
      result = await authStore.loginWithGoogle()
      break
    case 'facebook':
      result = await authStore.loginWithFacebook()
      break
    case 'github':
      result = await authStore.loginWithGithub()
      break
  }

  if (result.success) {
    emit('close')
  }
}

const closeModal = () => {
  emit('close')
  form.value = { displayName: '', email: '', password: '', confirmPassword: '' }
  authStore.clearError()
  passwordMismatch.value = false
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
      passwordMismatch.value = false
    }
  },
)

watch([() => form.value.password, () => form.value.confirmPassword], validatePasswords)
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Create Account</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      <div class="modal-body">
        <!-- Error Message -->
        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>

        <!-- Social Login Buttons -->
        <div class="social-login">
          <button
            @click="handleSocialLogin('google')"
            class="social-btn google"
            :disabled="authStore.loading"
          >
            <span class="social-icon">🔍</span>
            Continue with Google
          </button>

          <button
            @click="handleSocialLogin('facebook')"
            class="social-btn facebook"
            :disabled="authStore.loading"
          >
            <span class="social-icon">📘</span>
            Continue with Facebook
          </button>

          <button
            @click="handleSocialLogin('github')"
            class="social-btn github"
            :disabled="authStore.loading"
          >
            <span class="social-icon">⚫</span>
            Continue with GitHub
          </button>
        </div>

        <div class="divider">
          <span>or</span>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="form-group">
            <label for="displayName">Full Name</label>
            <input
              id="displayName"
              v-model="form.displayName"
              type="text"
              placeholder="Enter your full name"
              required
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              required
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-input">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a password (min. 6 characters)"
                required
                minlength="6"
                :disabled="isSubmitting"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="toggle-password"
                :disabled="isSubmitting"
              >
                {{ showPassword ? '👁️' : '🙈' }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <div class="password-input">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
                required
                :disabled="isSubmitting"
                :class="{ error: passwordMismatch }"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="toggle-password"
                :disabled="isSubmitting"
              >
                {{ showConfirmPassword ? '👁️' : '🙈' }}
              </button>
            </div>
            <div v-if="passwordMismatch" class="field-error">Passwords do not match</div>
          </div>

          <Button
            type="submit"
            :disabled="isSubmitting || authStore.loading || passwordMismatch"
            class="submit-btn"
          >
            {{ isSubmitting ? 'Creating Account...' : 'Create Account' }}
          </Button>
        </form>

        <!-- Footer Links -->
        <div class="modal-footer">
          <p>
            Already have an account?
            <button @click="$emit('switchToLogin')" class="link-btn">Sign in</button>
          </p>
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

.error-message {
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  border: 1px solid #fcc;
  text-align: center;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
  font-weight: 500;
}

.social-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.social-btn.google:hover:not(:disabled) {
  border-color: #4285f4;
}
.social-btn.facebook:hover:not(:disabled) {
  border-color: #1877f2;
}
.social-btn.github:hover:not(:disabled) {
  border-color: #333;
}

.social-icon {
  font-size: 1.2rem;
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #ddd;
}

.divider span {
  background: white;
  color: #999;
  padding: 0 1rem;
}

.register-form {
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

.form-group input.error {
  border-color: #e74c3c;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.field-error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.5rem;
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
