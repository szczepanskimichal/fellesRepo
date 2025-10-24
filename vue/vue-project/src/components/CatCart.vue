<script setup lang="ts">
import type { Cat } from '../assets/data'
import CatCartImage from './CatCartImage.vue'
import CatCardQuickView from './CatCardQuickView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isImageLoaded = ref(true)
const router = useRouter()

// Register components for dynamic usage by string name
defineOptions({
  components: {
    CatCartImage,
    CatCardQuickView,
  },
})

const props = defineProps<{
  cat: Cat
}>()

const navigateToCatDetails = () => {
  const catNameUrl = props.cat.name.toLowerCase().replace(/\s+/g, '-')
  router.push(`/cat/${catNameUrl}`)
}
</script>
<template>
  <section class="cat-card">
    <!-- <CatCartImage :cat="cat" v-if="isImageLoaded" @click="isImageLoaded = false"/>
    <CatCardQuickView :cat="cat" v-else v-on:to-image="isImageLoaded = true"/> -->

    <!-- dynamics components -->
    <component
      v-bind:is="isImageLoaded ? 'CatCartImage' : 'CatCardQuickView'"
      v-bind:cat="cat"
      v-on:to-image="isImageLoaded = true"
      v-on:to-quick-view="isImageLoaded = false"
      v-on:to-cat="navigateToCatDetails"
    />
  </section>
</template>
<style scoped>
/* CAT CARD STYLES */
.cat-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 5px #ddd;
  padding: 15px;
  text-align: center;
  border: #d17862 2px solid;
}
/* ----------------- */
</style>
