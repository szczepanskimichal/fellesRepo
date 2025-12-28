<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { inject } from 'vue';

const GlobalStore = inject("GlobalStore")
</script>

<template>
  <div class="layout">
    <header>
      <div id="flashMessage" v-if="GlobalStore?.flashMessage">
        {{ GlobalStore.flashMessage }}
      </div>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{name: 'event-list'}">Events</RouterLink> |
        <RouterLink :to="{name: 'about'}">About</RouterLink>
      </nav>
    </div>
  </header>
  <!-- <h1>Events For Good</h1> -->
  <RouterView />
  </div>
</template>

<style scoped>
  @keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: yellowfade;
  animation-duration: 3s;
}
.layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.header {
  display: flex;
  justify-content: center;
}
.nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 30px;
}
.nav a {
  font-weight: bold;
  color: #2c3e50;
}
.nav a.router-link-exact-active {
  color: #42b983;
}
.h2 {
  font-size: 20px;
}
</style>
