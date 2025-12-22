<script setup lang="ts">
import { ref } from 'vue';
  
  const count = ref(0);
  const showText = ref(false);
  const message = ref('');

  function addOne(num:number){
    count.value += num;
    message.value = ''
  }
  function removeOne(num:number){
    count.value += num;
  message.value = ''
  }
  function addFive(num:number){
    count.value += num;
    showText.value=true;
    message.value = ''
  }
  function reset(num:number){
    count.value = num;
    showText.value=false;
    message.value='reset done';
    setTimeout(() => {
      message.value='';
    }, 2000);
  }


</script>
<template>
  <div class="wrapper">
    <p v-if="showText">something other here</p>
    <img v-else src="" alt="picture"/>
    <p>{{ "passing arguments with methods:" + count }}</p>
    <button @click="addOne(1)">+1</button>
    <button @click="addFive(5)">+5</button>
    <button @click="removeOne(-1)">-1</button>
    <button @click="reset(0)">Reset</button>
    <p v-if="count === 0">{{message}}</p>
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