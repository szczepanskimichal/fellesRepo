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
