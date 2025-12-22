<script lang="ts" setup>
import { ref } from 'vue';
const imgUrl = ref('/pizza-svgrepo-com.svg');
const foods = ref([
  { name: 'Apple', url: '/apple-svgrepo-com.svg', id: 1 },
  { name:'Beef', url:'/beef-svgrepo-com.svg', id:2 },
  { name:'Pizza', url:'/pizza-svgrepo-com.svg', id:3 },
  { name:'Cake', url:'/cake-svgrepo-com.svg', id:4 },
  { name:'Orange', url:'/orange-svgrepo-com.svg', id:5 },
  
]);
</script>
<template>
  <h3>Show food image</h3>
  <div class="wrapper">
    
    <ol>
      <li v-for="food in foods" :key="food.id" @click="imgUrl = food.url">{{food.id}}. {{ food.name}}</li>
    </ol>
    <img v-bind:src="imgUrl">
  </div>
</template>
<style scoped>
.wrapper{
  display: inline-flex;
  align-items: center;
}
ol{
  list-style-type: none;
  padding: 0;
}
li{
  cursor: pointer;
  margin: 5px 0;
}
img{
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
}
</style>