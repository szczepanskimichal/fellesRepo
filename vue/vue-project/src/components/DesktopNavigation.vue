<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

defineOptions({
  name: 'DesktopNavigation',
})

const authStore = useAuthStore()

defineEmits<{
  openLogin: []
}>()

const handleLogout = async () => {
  await authStore.logout()
}
</script>

<template>
  <nav class="desktop-nav">
    <div class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About Us</router-link>
      <router-link to="/adopt" class="nav-link">Adopt</router-link>
      <router-link to="/adopt-a-cat" class="nav-link">Adopt a Cat</router-link>
      <router-link to="/contact" class="nav-link">Contact</router-link>
    </div>

    <div class="auth-section">
      <!-- Authenticated User -->
      <div v-if="authStore.isAuthenticated" class="user-menu">
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
          <span class="user-name">{{ authStore.userProfile?.displayName || 'User' }}</span>
        </div>
        <button @click="handleLogout" class="logout-btn">Sign Out</button>
      </div>

      <!-- Not Authenticated -->
      <!-- Not Authenticated -->
      <div v-else class="auth-buttons">
        <button @click="$emit('openLogin')" class="auth-btn login-btn">Log In</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.desktop-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex: 1;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #f6f6f6;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.3s;
}

.nav-link:hover {
  color: #d17862;
  background: #f8f9fa;
}

.nav-link.router-link-active {
  color: #ffe97b;
  background: rgba(255, 233, 123, 0.1);
}

.auth-section {
  display: flex;
  align-items: center;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-avatar-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffe97b;
  color: #d17862;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.user-name {
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
}

.logout-btn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.auth-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.auth-btn {
  background: none;
  border: none;
  color: #f6f6f6;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.3s;
  font-weight: 500;
}

.login-btn:hover {
  color: #ffe97b;
  background: rgba(255, 233, 123, 0.1);
}

.register-btn {
  margin: 0;
  font-size: 0.9rem;
  padding: 8px 16px;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
}
</style>
