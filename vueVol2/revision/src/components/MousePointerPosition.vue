<script lang="ts" setup>
import { ref } from 'vue';
const xPos = ref(0);
const yPos = ref(0);
// function updateMousePosition(event:MouseEvent) {
//   xPos.value = event.clientX;
//   yPos.value = event.clientY;
// }
// window.addEventListener('mousemove', updateMousePosition);
function mousePos(event: MouseEvent) {
  xPos.value = event.offsetX;
  yPos.value = event.offsetY;
}
</script>
<template>
  <div class="wrapper">
    <h2>Mouse Pointer Position</h2>
    <p>Mouse position: (x, y)</p>
    <div class="box" @mousemove="mousePos" v-bind:style="{backgroundColor:'hsl('+xPos+',80%,80%)'}">
      <span>xPos: {{ xPos }}</span>
      <br/>
      <span>yPos: {{ yPos }}</span>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
  border: black dashed 1px;
  width: 200px;
  padding: 0 20px 20px 20px;
}
.box {
  width: 160px;
  height: 80px;
  background-color: lightcoral;

}
span {
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}
</style>