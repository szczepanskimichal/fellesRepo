<script lang="ts">
export default {
  name: "AppBanner"
};
</script>

<template>
  <section id="banner">
    <slot />
    <!-- <p>🐾 <strong>MEET OUR CATS:</strong> Adopt a furry friend today! 🐾</p> -->
  </section>
</template>

<style scoped>
#banner {
  width: 100%;
  background: #ffe97b;
  padding: 10px;
  text-align: center;
}
</style>