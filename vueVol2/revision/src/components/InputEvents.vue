<script setup lang="ts">
  import { ref } from 'vue';
  const inputCounter = ref('');
  
</script>  
<template>
  <div class="wrapper">
    <input type="text" placeholder="start writing ..." v-model="inputCounter">
    <p>{{ 'inputs events occured:' + inputCounter.length }}</p>
  </div>
</template>