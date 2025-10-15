<script setup lang="ts">
import type { Cat } from '../assets/data';
import CatCartImage from './CatCartImage.vue';
import CatCardQuickView from './CatCardQuickView.vue';
import {ref} from 'vue';

const isImageLoaded = ref(true);

defineProps<{
  cat: Cat;
}>();
</script>
<template>
  <section class="cat-card">
    <CatCartImage :cat="cat" v-if="isImageLoaded" @click="isImageLoaded = false"/>
    <CatCardQuickView :cat="cat" v-else v-on:to-image="isImageLoaded = true"/>
  </section>
</template>
<style scoped>
/* CAT CARD STYLES */
.cat-card {
  width:100%;
  display:flex;
  flex-direction:column;
  border-radius:10px;
  box-shadow: 0 0 5px #ddd;
  padding:15px;
  text-align: center;
  border: #D17862 2px solid;
}
/* ----------------- */







</style>