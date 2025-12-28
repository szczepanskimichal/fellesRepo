<script setup>
import { useRouter } from 'vue-router'

defineProps(['event'])

const router = useRouter()

const register = () => {
  // Call to API
  // If registered then redirect to event details
  router.push({
    name: 'event-register',
    // id: props.event.id
  })
}
</script>
<template>
  <div>
    <p>Registration event</p>
    <button @click="register">Register</button>
  </div>
</template>
