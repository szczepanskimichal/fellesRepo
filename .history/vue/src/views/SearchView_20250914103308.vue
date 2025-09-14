<template>
  <div class="wrapper">
    <div class="search">
      <label for="search">Search
      <input 
      id="search" v-model="searchValue" name="search"/>
    </label>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
export default {
  name: 'SearchView',
  data() {
    return {
      searchValue: '',
    };
  },
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
  }
  .search{
    display: flex;
    flex-direction: column;
    max-width: 250px;
  label{
    font-family: 'Montserrat', sans-serif;
  }
  input{
    height: 30px;
    border: 0; // forelopig dette fungerer ikke
    border-bottom: 2px solid black;
  }
  }
  </style>
