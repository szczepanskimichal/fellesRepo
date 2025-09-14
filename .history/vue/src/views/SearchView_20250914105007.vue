<template>
  <div class="wrapper">
    <div class="search">
      <label for="search">Search
      <input id="search" v-model="searchValue" name="search" @input="handleInput"/>
    </label>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

const API = 'https://images-api.nasa.gov/search';

export default {
  name: 'SearchView',
  data() {
    return {
      searchValue: '',
    };
  },
  methods: {
    handleInput() {
      axios.get(`${API}?q=${this.searchValue}&media_type=image`).then((response) => {console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    },
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
