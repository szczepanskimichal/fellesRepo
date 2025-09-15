<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <!-- <router-link to="/about">About</router-link> | -->
    <router-link to="/search">Search</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  ;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background-color: #f4f4f4;
  color: #333;
}
</style>
