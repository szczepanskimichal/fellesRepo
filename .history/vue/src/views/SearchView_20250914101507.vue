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
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 30px;
  max-width: 100%;
</style>