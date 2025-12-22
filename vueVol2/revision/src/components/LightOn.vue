<script setup lang="ts">
import { ref } from 'vue';
const lightOn = ref(true);
</script>

<template>
  <h3>Light Switch</h3>
  <div class="wrapper">
    <div class="lightDiv">
      <div v-if="lightOn" class="light-bg"></div>
      <img src="/q-svgrepo-com.svg" alt="Light On" />
    </div>
    <button @click="lightOn = !lightOn">Toggle Light</button>
  </div>
</template>

<style scoped>
.wrapper {
  border: solid gray 1px;
  display: inline-block;
  padding-bottom: 10px;
}
.wrapper > button {
  display: block;
  margin: auto;
}
.lightDiv {
  position: relative;
  width: 150px;
  height: 150px;
}
.light-bg {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background-color: yellow;
  z-index: 1;
}
.lightDiv > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>