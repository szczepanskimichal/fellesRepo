<template>
  <div class="wrapper">
    <div class="search">
      <p class="search-label" for="search">Search...</p>
      <input id="search" v-model="searchValue" name="search" @input="handleInput"/>
    </div>
    <ul>
      <li v-for="item in results" :key="item.data[0].nasa_id">
        <img :src="item.links[0].href" :alt="item.data[0].title" width="200"/>
        <!-- <p>{{ item.data[0].title }}</p> -->
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

import debounce from 'lodash/debounce';

const API = 'https://images-api.nasa.gov/search';

export default {
  name: 'SearchView',
  data() {
    return {
      searchValue: '',
      results: [],
    };
  },
  methods: {
    handleInput: debounce(function () {
      axios.get(`${API}?q=${this.searchValue}&media_type=image`).then((response) => {
        this.results = response.data.collection.items;
      }).catch((error) => {
        console.error('There was an error!', error);
      });
    }, 500),
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
  } .search{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 250px;
  .search-label {
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
  }
    input{
    height: 10px;
    border: 0; // forelopig dette fungerer ikke
    border-bottom: 2px solid black;
  }
  }
  </style>
  }
  </style>
