<template>
  <h1 :style="myColor">Velkommen {{ name }}!</h1>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('Michal')
const myColor = ref({ color: '#ffaabb' })
</script>
