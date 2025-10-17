<script setup lang="ts">
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import CatCart from './components/CatCart.vue';
import Banner from './components/Banner.vue';
import cats from './assets/data';
import Button from './components/Button.vue';
</script>


<template>

  <AppHeader />
  <Banner>
    <p>🐾 <strong>MEET OUR CATS:</strong> Adopt a furry friend today! 🐾</p>
  </Banner>

<main>
   <CatCart v-for="cat in cats" :key="cat.name" :cat="cat"/>
   <CatCart v-for="cat in cats" :key="cat.name" :cat="cat"/>
</main>
<Button>Show More!</Button>
<AppFooter />
</template>

<style scoped>
.template{
  max-width:1200px;
  margin:0 auto;
  box-shadow: 0 0 10px #ccc;
  border-radius:10px;
  overflow:hidden;
  background:#f9f9f9;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  justify-content: center;
  align-items: center;
}
main{
  padding:10px;
  display:grid;
  grid-template-columns: 1fr;
  gap:10px;
  background:white;
  ;
}

@media (min-width:414px){
  main{
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width:768px){
  main{
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width:1200px){
  main{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
/* ----------------- */

</style>