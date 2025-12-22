<script setup lang="ts">
  import { ref, watch } from 'vue';

const changeCake = ref('/cake-svgrepo-com.svg');
const count = ref(0);
const bgColor = ref('');
const changeBg = () => {
 bgColor.value=bgColor.value === '' ? 'lightblue' : '';
  document.body.style.backgroundColor = bgColor.value;
}
watch(count, (newVal) => {
  changeCake.value = newVal >= 5 ? 'orange-svgrepo-com.svg' : '/cake-svgrepo-com.svg';
});
</script>

<template>
<div>
  <img :src="changeCake" alt="Cake" width="100" height="100" />
  <p>{{ "Cake count:" + count}}</p>
  <button v-on:click="count++">Count cake</button>
  <button v-on:click="count--">Decrease cake</button>
  <button v-on:click="changeBg">Change Bg</button>
</div>

</template>

<style scoped>

</style>
