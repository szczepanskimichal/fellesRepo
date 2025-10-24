<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

defineOptions({
  name: 'MobileNavigation',
})

const authStore = useAuthStore()

defineEmits<{
  openLogin: []
  openRegister: []
}>()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  closeMobileMenu()
}
</script>

<template>
  <button @click="toggleMobileMenu" class="mobile-menu-btn">
    <span class="hamburger" :class="{ active: isMobileMenuOpen }"></span>
  </button>

  <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }">
    <!-- Navigation Links -->
    <div class="nav-section">
      <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">Home</router-link>
      <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu"
        >About Us</router-link
      >
      <router-link to="/adopt" class="mobile-nav-link" @click="closeMobileMenu">Adopt</router-link>
      <router-link to="/adopt-a-cat" class="mobile-nav-link" @click="closeMobileMenu"
        >Adopt a Cat</router-link
      >
      <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu"
        >Contact</router-link
      >
    </div>

    <!-- Auth Section -->
    <div class="auth-section">
      <!-- Authenticated User -->
      <div v-if="authStore.isAuthenticated" class="user-section">
        <div class="user-info">
          <img
            v-if="authStore.userProfile?.photoURL"
            :src="authStore.userProfile.photoURL"
            :alt="authStore.userProfile.displayName || 'User'"
            class="user-avatar"
          />
          <span v-else class="user-avatar-placeholder">
            {{
              (
                (authStore.userProfile?.displayName || authStore.userProfile?.email || 'U')[0] ||
                'U'
              ).toUpperCase()
            }}
          </span>
          <div class="user-details">
            <span class="user-name">{{ authStore.userProfile?.displayName || 'User' }}</span>
            <span class="user-email">{{ authStore.userProfile?.email }}</span>
          </div>
        </div>
        <button @click="handleLogout" class="mobile-logout-btn">Sign Out</button>
      </div>

      <!-- Not Authenticated -->
      <div v-else class="auth-buttons">
        <button
          @click="
            () => {
              $emit('openLogin')
              closeMobileMenu()
            }
          "
          class="mobile-auth-btn login-btn"
        >
          Log In
        </button>
      </div>
    </div>
  </nav>

  <!-- Overlay -->
  <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>
</template>

<style scoped>
/* Mobile Menu btn */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.hamburger {
  width: 25px;
  height: 3px;
  background: #333;
  border-radius: 3px;
  position: relative;
  transition: all 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 3px;
  background: #333;
  border-radius: 3px;
  transition: all 0.3s;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

.hamburger.active {
  background: transparent;
}

.hamburger.active::before {
  top: 0;
  transform: rotate(45deg);
}

.hamburger.active::after {
  bottom: 0;
  transform: rotate(-45deg);
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background: #d17862;
  transform: translateX(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-nav.open {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
}

.nav-section {
  flex: 1;
  padding: 1rem 0;
}

.mobile-nav-link {
  display: block;
  padding: 1rem 2rem;
  color: white;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.3s;
}

.mobile-nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-nav-link.router-link-active {
  background: rgba(255, 233, 123, 0.2);
  color: #ffe97b;
}

.auth-section {
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
}

.user-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffe97b;
  color: #d17862;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.user-email {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
}

.mobile-logout-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.mobile-logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-auth-btn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-register-btn {
  margin: 0;
  background: #ffe97b;
  color: #d17862;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
}
</style>
