<script setup lang="ts">
  import { ref } from 'vue';
import ProductDisplay from './components/ProductDisplay.vue';

  const cart = ref(0);
  // const preminum = ref(true);
  
</script>
<template>
  <div class="nav-bar"></div>
  <div class="cart">Cart({{ cart }})</div>
  <product-display></product-display>
  
  <a :href="url">More about me</a>
</template>