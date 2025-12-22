<script lang="ts" setup>
  type sourceItem = { item: string; url: string };
  const source: sourceItem[] = [
    { item: 'Pizza', url:'../public/pizza-svgrepo-com.svg' },
    { item: 'Lollipop', url:'../public/lollipop-svgrepo-com.svg' },
    { item: 'Orange', url:'../public/orange-svgrepo-com.svg' },
    { item: 'staff', url:'../public/staff-svgrepo-com.svg' },
  ]
</script>
<template>
  <h1>array element index with 'v-for'</h1>
  <div>
    <div class="galery" v-for="(item, index) in source" :key="index">
      <img :src="item.url"    />
      <p>{{ index }}: {{ item.item }}</p>
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
  .galery {
    margin: 20px;
    background-color: rgb(97, 9, 84);
    display: flex;
    flex-direction: column;
  }
  img {
    width: 100px;
    height: 100px;
  }
</style>