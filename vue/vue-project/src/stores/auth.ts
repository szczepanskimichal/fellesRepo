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
