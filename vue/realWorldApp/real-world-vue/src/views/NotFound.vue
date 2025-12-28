<script setup>
  defineProps({
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  })
</script>
<template>
  <h1>Oops!!!</h1>
  <h3>The {{ resource }} you are looking for does not exist.</h3>
  <router-link :to="{name:'event-list'}">Back to Events List</router-link>
</template>
