<script lang="ts" setup>
  
type FoodItem = { name: string; url: string };
const food: FoodItem[] = [
  { name: 'Apple', url: '../public/apple-svgrepo-com.svg' },
  { name: 'Beef', url: '../public/beef-svgrepo-com.svg' },
  { name: 'Beer', url: '../public/beer-svgrepo-com.svg' },
  { name: 'Cake', url: '../public/cake-svgrepo-com.svg' },
  { name: 'Candlestick', url: '../public/candlestick-svgrepo-com.svg' },
  { name: 'Strawberry', url: '../public/strawberry-svgrepo-com.svg' },
  
];
</script>
<template>
  <div >
    <h1>List Rendering example with v-for</h1>
  <div>
    <figure v-for="matt in food">
      <img v-bind:src="matt.url" v-bind:alt="matt.name" width="100" height="100"/>
      <figcaption>{{matt.name}}</figcaption>
    </figure>
  </div>
</div>
  
</template>
<style scoped>
  div {
    text-align: center;
    border: solid gray 1px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  figure {
    display: inline-block;
    margin: 20px;
    background-color: rgb(9, 9, 97);
  }
</style>