<script lang="ts" setup>
import { ref } from 'vue';
const text = ref('');
</script>
<template>
  <div class="wrapper">
    <textarea v-model="text" placeholder="Type your notes here..." class="textarea"></textarea>
    <div class="paper">
      <span>{{ text }}</span>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
    border: black dashed 1px;
  width: 300px;
  padding: 20px;
}
.textarea {
  width: 100%;
  box-sizing: border-box;
}
.paper {
  width: 100%;
  position: relative;
  margin-top: 10px;
  aspect-ratio: 1;
  background-image: url("/img_notebook.jpg");
  background-size: 340%;
  background-position: -345px 0;
  overflow: hidden;
}
.paper span {
  color: black;
  width: 80%;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.2em;
  transform-origin: 0 0;
  rotate: 33deg;
  position: absolute;
  top: 50px;
  left: 70px;
}
</style>