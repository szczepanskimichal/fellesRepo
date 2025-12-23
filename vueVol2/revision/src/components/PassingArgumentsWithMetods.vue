<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  showText: false,
  message: ''
});

function addOne(num: number) {
  state.count += num;
  state.message = '';
}
function removeOne(num: number) {
  state.count += num;
  state.message = '';
}
function addFive(num: number) {
  state.count += num;
  state.showText = true;
  state.message = '';
}
function reset(num: number) {
  state.count = num;
  state.showText = false;
  state.message = 'reset done';
  setTimeout(() => {
    state.message = '';
  }, 2000);
}
</script>

<template>
  <div class="wrapper">
    <p v-if="state.showText">something other here</p>
    <img v-else src="" alt="picture"/>
    <p>{{ "passing arguments with methods:" + state.count }}</p>
    <button @click="addOne(1)">+1</button>
    <button @click="addFive(5)">+5</button>
    <button @click="removeOne(-1)">-1</button>
    <button @click="reset(0)">Reset</button>
    <p v-if="state.count === 0">{{ state.message }}</p>
  </div>
</template>

<style scoped>
.wrapper {
  border: dashed black 1px;
  width: 250px;
  padding: 10px;
}
img {
  width: 100%;
}
button {
  margin: 10px;
  padding: 5px 10px;
}
</style>