<script lang="ts" setup>
import { ref } from 'vue';
const colorVal = ref(0);
</script>
<template>
  
  <div class="wrapper">
    <h2>Mouse Pointer</h2>
    <p>Move your mouse around!</p>
    <div v-on:mousemove=" colorVal = Math.floor(Math.random()*360) " v-bind:style=" {backgroundColor: 'hsl('+colorVal+',60%,60%)'} "></div>
  <p><span>backgroundColor: hsl(<strong>{{ colorVal }}</strong>, 80%, 80%)</span></p>
  </div>
</template>
<style scoped>
    .wrapper {
      border: dashed black 1px;
      width: 350px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .wrapper > div {
      width: 200px;
      height: 80px;
    }
    .wrapper span {
      font-weight: bold;
      font-family: 'Courier New', Courier, monospace;
    }
</style>