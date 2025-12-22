<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Index from './components/Index.vue';
import InputEvents from './components/InputEvents.vue';
import LightOn from './components/LightOn.vue';
import ListRendering from './components/ListRendering.vue';
import MousePointer from './components/MousePointer.vue';
import MousePointerPosition from './components/MousePointerPosition.vue';
import Notebook from './components/Notebook.vue';
import PassingArgumentsWithMetods from './components/PassingArgumentsWithMetods.vue';
import ShowFood from './components/ShowFood.vue';
const changeBg = () => {
  const currentColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = currentColor === 'lightblue' ? '' : 'lightblue';
}
</script>

<template>
  <div class="layout">
    <button v-on:click="changeBg" class="changeBg">Change Bg</button>
<PassingArgumentsWithMetods />
<Notebook/>
<MousePointerPosition/>  
<ShowFood/>
<MousePointer/>
<InputEvents/>
<LightOn/>
<HelloWorld/>
<Index />
<ListRendering />
  </div>

</template>
<style scoped>
  .layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  }
  .changeBg {
    position: fixed;
    top: 16px;
    right: 16px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
