# Instrukcja tworzenia projektu Vue.js Cat Adoption Center

## Przewodnik krok po kroku do stworzenia kompletnego projektu Vue 3 z TypeScript, Pinia, Vue Router i Firebase

### Przygotowanie środowiska

#### 1. Wymagania systemowe
- Node.js (wersja ^20.19.0 lub >=22.12.0)
- npm lub yarn
- Git

#### 2. Sprawdzenie wersji Node.js
```bash
node --version
npm --version
```

### Krok 1: Utworzenie nowego projektu Vue

```bash
# Utworzenie nowego projektu Vue z oficjalnym narzędziem
npm create vue@latest vue-project

# Podczas konfiguracji wybierz:
# ✅ Add TypeScript? Yes
# ✅ Add JSX Support? No
# ✅ Add Vue Router for Single Page Application development? Yes
# ✅ Add Pinia for state management? Yes
# ✅ Add Vitest for Unit Testing? No
# ✅ Add an End-to-End Testing Solution? No
# ✅ Add ESLint for code quality? Yes
# ✅ Add Prettier for code formatting? Yes
# ✅ Add Vue DevTools 7 extension for debugging? Yes

# Przejście do katalogu projektu
cd vue-project
```

### Krok 2: Instalacja dodatkowych zależności

```bash
# Instalacja Firebase
npm install firebase

# Instalacja dodatkowych dev dependencies (jeśli nie są zainstalowane)
npm install --save-dev @tsconfig/node22 jiti npm-run-all2 vite-plugin-vue-devtools
```

### Krok 3: Konfiguracja struktury folderów

```bash
# Utworzenie dodatkowych folderów
mkdir -p src/components/auth
mkdir -p src/firebase
mkdir -p src/stores
mkdir -p src/views
mkdir -p src/assets
mkdir -p public/photos
```

### Krok 4: Konfiguracja plików głównych

#### 4.1 Zaktualizuj `package.json` - dodaj engines:
```json
{
  "engines": {
    "node": "^20.19.0 || >=22.12.0"
  }
}
```

#### 4.2 Zaktualizuj `vite.config.ts`:
```typescript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```

### Krok 5: Konfiguracja Firebase

#### 5.1 Utwórz `src/firebase/config.ts`:
```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
// W produkcji te wartości powinny być w zmiennych środowiskowych
const firebaseConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'cat-adoption-center.firebaseapp.com',
  projectId: 'cat-adoption-center',
  storageBucket: 'cat-adoption-center.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456789',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
```

### Krok 6: Konfiguracja Pinia Store (Autentykacja)

#### 6.1 Utwórz `src/stores/auth.ts`:
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  type User,
  type AuthError,
} from 'firebase/auth'
import { auth } from '@/firebase/config'

interface UserProfile {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  provider?: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userProfile = computed((): UserProfile | null => {
    if (!user.value) return null
    return {
      uid: user.value.uid,
      email: user.value.email,
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      emailVerified: user.value.emailVerified,
      provider: user.value.providerData[0]?.providerId,
    }
  })

  // Actions
  const initAuth = () => {
    return new Promise<void>((resolve) => {
      try {
        const unsubscribe = onAuthStateChanged(
          auth,
          (firebaseUser) => {
            user.value = firebaseUser
            loading.value = false
            unsubscribe()
            resolve()
          },
          (error) => {
            console.warn('Auth state change error:', error)
            loading.value = false
            unsubscribe()
            resolve()
          },
        )
      } catch (err) {
        console.warn('Auth initialization error:', err)
        loading.value = false
        resolve()
      }
    })
  }

  const register = async (email: string, password: string, displayName: string) => {
    try {
      loading.value = true
      error.value = null

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: displayName,
      })

      user.value = userCredential.user
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const loginWithGoogle = async () => {
    try {
      loading.value = true
      error.value = null

      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      user.value = userCredential.user
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const loginWithFacebook = async () => {
    try {
      loading.value = true
      error.value = null

      const provider = new FacebookAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      user.value = userCredential.user
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const loginWithGithub = async () => {
    try {
      loading.value = true
      error.value = null

      const provider = new GithubAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      user.value = userCredential.user
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      await signOut(auth)
      user.value = null
      error.value = null
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email: string) => {
    try {
      loading.value = true
      error.value = null

      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No user found with this email address.'
      case 'auth/wrong-password':
        return 'Incorrect password.'
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.'
      case 'auth/popup-closed-by-user':
        return 'Sign-in was cancelled.'
      case 'auth/popup-blocked':
        return 'Popup was blocked by browser. Please allow popups and try again.'
      default:
        return 'An error occurred. Please try again.'
    }
  }

  const handleAuthError = (err: unknown): string => {
    return getErrorMessage((err as { code?: string })?.code || 'unknown')
  }

  return {
    // State
    user,
    loading,
    error,
    // Getters
    isAuthenticated,
    userProfile,
    // Actions
    initAuth,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    loginWithGithub,
    logout,
    resetPassword,
    clearError,
  }
})
```

### Krok 7: Konfiguracja routingu

#### 7.1 Zaktualizuj `src/router/index.ts`:
```typescript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Adopt from '@/views/Adopt.vue'
import AdoptACat from '@/views/AdoptACat.vue'
import Contact from '@/views/Contact.vue'
import CatDetails from '@/views/CatDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/adopt',
      name: 'adopt',
      component: Adopt,
    },
    {
      path: '/adopt-a-cat',
      name: 'adopt-a-cat',
      component: AdoptACat,
    },
    {
      path: '/cat/:name',
      name: 'cat-details',
      component: CatDetails,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    // Redirect old route names to new ones
    {
      path: '/adopt-cat',
      redirect: '/adopt-a-cat',
    },
  ],
})

export default router
```

### Krok 8: Konfiguracja głównej aplikacji

#### 8.1 Zaktualizuj `src/main.ts`:
```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
```

#### 8.2 Zaktualizuj `src/App.vue`:
```vue
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
```

### Krok 9: Dane aplikacji

#### 9.1 Utwórz `src/assets/data.ts`:
```typescript
export interface Cat {
  name: string
  age: number
  breed: string
  personality: string[]
  images: string[]
}

const cats: Cat[] = [
  {
    name: 'Milo',
    age: 2,
    breed: 'British Shorthair',
    personality: ['playful', 'curious', 'friendly'],
    images: ['1.jpg', '1-2.jpg', '1-3.jpg'],
  },
  {
    name: 'Luna',
    age: 1,
    breed: 'Sphynx',
    personality: ['affectionate', 'vocal', 'energetic'],
    images: ['2.jpg', '2-2.jpg'],
  },
  {
    name: 'Oliver',
    age: 3,
    breed: 'Maine Coon',
    personality: ['gentle', 'lazy', 'fluffy'],
    images: ['3.jpg', '3-2.jpg', '3-3.jpg', '3-4.jpg'],
  },
  {
    name: 'Cleo',
    age: 4,
    breed: 'Siamese',
    personality: ['intelligent', 'talkative', 'loyal'],
    images: ['4.jpg', '4-2.jpg'],
  },
  {
    name: 'Nala',
    age: 5,
    breed: 'Ragdoll',
    personality: ['calm', 'friendly', 'affectionate'],
    images: ['5.jpg', '5-2.jpg', '5-3.jpg'],
  },
  {
    name: 'Simba',
    age: 2,
    breed: 'Bengal',
    personality: ['adventurous', 'energetic', 'curious'],
    images: ['6.jpg', '6-2.jpg', '6-3.jpg'],
  },
]

export default cats
```

### Krok 10: Komponenty bazowe

#### 10.1 Utwórz `src/components/Button.vue`:
```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="[
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--disabled': disabled || loading },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-else />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  font-family: inherit;
  white-space: nowrap;
}

.btn:focus {
  outline: 2px solid #d17862;
  outline-offset: 2px;
}

/* Variants */
.btn--primary {
  background-color: #d17862;
  color: white;
}

.btn--primary:hover:not(.btn--disabled) {
  background-color: #b8654a;
  transform: translateY(-1px);
}

.btn--secondary {
  background-color: #ffe97b;
  color: #d17862;
}

.btn--secondary:hover:not(.btn--disabled) {
  background-color: #ffd93d;
  transform: translateY(-1px);
}

.btn--outline {
  background-color: transparent;
  color: #d17862;
  border: 2px solid #d17862;
}

.btn--outline:hover:not(.btn--disabled) {
  background-color: #d17862;
  color: white;
}

/* Sizes */
.btn--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* States */
.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.loading-spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
```

#### 10.2 Utwórz `src/components/Header.vue`:
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeaderLogo from './HeaderLogo.vue'
import DesktopNavigation from './DesktopNavigation.vue'
import MobileNavigation from './MobileNavigation.vue'
import AuthManager from './auth/AuthManager.vue'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const navigateHome = () => {
  router.push('/')
  closeMobileMenu()
}
</script>

<template>
  <header class="header">
    <nav class="nav">
      <HeaderLogo @click="navigateHome" />
      
      <DesktopNavigation />
      
      <div class="auth-container">
        <AuthManager />
        
        <!-- Mobile menu button -->
        <button
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle mobile menu"
        >
          <span class="hamburger-line" :class="{ 'hamburger-line--active': isMobileMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'hamburger-line--active': isMobileMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'hamburger-line--active': isMobileMenuOpen }"></span>
        </button>
      </div>
    </nav>
    
    <MobileNavigation 
      :is-open="isMobileMenuOpen" 
      @close="closeMobileMenu"
    />
  </header>
</template>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.auth-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.25rem;
}

.hamburger-line {
  width: 24px;
  height: 3px;
  background-color: #d17862;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-line--active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-line--active:nth-child(2) {
  opacity: 0;
}

.hamburger-line--active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
  .nav {
    padding: 1rem;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
}
</style>
```

### Krok 11: Widoki (Views)

#### 11.1 Utwórz `src/views/Home.vue`:
```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

defineOptions({
  name: 'HomePage',
})

const router = useRouter()

const navigateToAdopt = () => {
  router.push('/adopt')
}

const navigateToSurrender = () => {
  router.push('/adopt-a-cat')
}
</script>

<template>
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>🐾 Find Your Perfect Feline Friend</h1>
      <p class="hero-subtitle">
        Every cat deserves a loving home. Every home deserves the joy of a cat.
      </p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">250+</span>
          <span class="stat-label">Cats Adopted</span>
        </div>
        <div class="stat">
          <span class="stat-number">50+</span>
          <span class="stat-label">Cats Available</span>
        </div>
        <div class="stat">
          <span class="stat-number">100%</span>
          <span class="stat-label">Love Guaranteed</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Action Cards -->
  <section class="action-cards">
    <div class="card adopt-card">
      <div class="card-icon">🏠</div>
      <h3>Looking for a Cat?</h3>
      <p>Browse our amazing cats waiting for their forever homes</p>
      <Button @click="navigateToAdopt">Browse Cats</Button>
    </div>

    <div class="card surrender-card">
      <div class="card-icon">❤️</div>
      <h3>Need to Rehome Your Cat?</h3>
      <p>We help find loving homes for cats that need new families</p>
      <Button @click="navigateToSurrender">Surrender a Cat</Button>
    </div>
  </section>
</template>

<style scoped>
/* Hero Section */
.hero {
  background: linear-gradient(135deg, #d17862 0%, #b8654a 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffe97b;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

/* Action Cards */
.action-cards {
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .action-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  background: white;
  border-radius: 15px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 3px solid transparent;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.adopt-card {
  border-color: #d17862;
}

.surrender-card {
  border-color: #ffe97b;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card h3 {
  color: #d17862;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card p {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
```

### Krok 12: Pozostałe komponenty

Należy utworzyć pozostałe komponenty wymagane przez Header.vue:

- `src/components/HeaderLogo.vue`
- `src/components/DesktopNavigation.vue`
- `src/components/MobileNavigation.vue`
- `src/components/Footer.vue`
- `src/components/auth/AuthManager.vue`
- `src/components/auth/LoginModal.vue`
- `src/components/auth/RegisterModal.vue`
- `src/components/auth/ResetPasswordModal.vue`

I pozostałe widoki:
- `src/views/About.vue`
- `src/views/Adopt.vue`
- `src/views/AdoptACat.vue`
- `src/views/Contact.vue`
- `src/views/CatDetails.vue`

### Krok 13: Dodanie zdjęć

```bash
# Dodaj zdjęcia kotów do folderu public/photos/
# Pliki: 1.jpg, 1-2.jpg, 1-3.jpg, 2.jpg, 2-2.jpg, itd.
```

### Krok 14: Uruchomienie aplikacji

```bash
# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev

# Aplikacja będzie dostępna pod adresem http://localhost:5173
```

### Krok 15: Komendy pomocnicze

```bash
# Budowanie aplikacji na produkcję
npm run build

# Podgląd produkcyjnej wersji
npm run preview

# Sprawdzanie typów TypeScript
npm run type-check

# Formatowanie kodu
npm run format

# Linting kodu
npm run lint
```

### Dodatkowe informacje

#### Konfiguracja Firebase w produkcji:
1. Utwórz projekt w Firebase Console
2. Zastąp demo konfigurację w `src/firebase/config.ts` rzeczywistymi danymi
3. Użyj zmiennych środowiskowych dla bezpieczeństwa

#### Struktura projektu po ukończeniu:
```
vue-project/
├── public/
│   └── photos/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── auth/
│   ├── firebase/
│   ├── router/
│   ├── stores/
│   └── views/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

Ten przewodnik pomoże Ci utworzyć kompletną aplikację Vue.js z autentykacją Firebase, routingiem i zarządzaniem stanem.