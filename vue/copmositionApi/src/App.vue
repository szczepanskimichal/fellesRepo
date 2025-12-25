<script setup>
import { ref } from 'vue';
import ProductDisplay from './components/ProductDisplay.vue';

  const cart = ref([]);
  const premium = ref(false);
  const updateCart = (id) => {
    cart.value.push(id);
  }
  const removeFromCart = (id) => {
    const index = cart.value.indexOf(id);
    if(index > -1){
      cart.value.splice(index, 1);
    }
  }
</script>
<template>
  <div class="nav-bar"></div>
  <div class="cart">Cart({{ cart.length }})</div>
  <product-display :premium="premium" @add-to-cart="updateCart" v-on:remove-from-cart="removeFromCart"></product-display>
  
  <a :href="url">More about me</a>
</template>