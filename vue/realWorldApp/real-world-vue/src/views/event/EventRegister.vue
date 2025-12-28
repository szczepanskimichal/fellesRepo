<script setup>
import { useRouter } from 'vue-router'
import { defineProps, inject } from 'vue';

defineProps(['event'])
const router = useRouter()
const GlobalStore = inject("GlobalStore") // inject the global store, i'm making GlobalStore available in this component


const register = () => {
  // Call to API
  // If registered then redirect to event details
  GlobalStore.flashMessage = "You have successfully registered for " + event.title + "!";
  setTimeout(() => {
    GlobalStore.flashMessage = ""; // Clear the message after 3 seconds!!!
  }, 3000);
  router.push({
    name: 'event-details',
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
