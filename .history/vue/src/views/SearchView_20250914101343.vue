<template>
  <div class="wrapper">
    <div class="search">
      <label for="search">
      <input id="search" type="text" placeholder="Search..." name="search"/>
    </label>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
export default {
  name: 'SearchView',
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  </style>