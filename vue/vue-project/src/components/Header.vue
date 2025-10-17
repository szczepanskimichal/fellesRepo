<script setup lang="ts">
defineOptions({
  name: 'AppHeader'
});
</script>

<template>
  <header class="header">
    <div class="header-content">
    <img src="/photos/heart.png" alt="Logo"/>
    <span>Cat Adoption Center</span>
    </div>
    <nav class="desktop-nav">
      <a href="#" class="nav-link">Home</a>
      <a href="#" class="nav-link">About Us</a>
      <a href="#" class="nav-link">Adopt</a>
      <a href="#" class="nav-link">Adopt a Cat</a>
      <a href="#" class="nav-link">Contact</a>
    </nav>
  </header>
</template>

<style scoped>
header{
  width:100%;
  background:#D17862;
  color:white;
  display:flex;
  align-items:center;
  padding:10px;
  position: sticky;
  z-index: 1000;
}
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}
.header-content img {
  height:50px;
}

/* Desktop for data*/
.desktop-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #f6f6f6;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 5px;
  transition: all 0.3s;
}

.nav-link:hover {
  color: #D17862;
  background: #f8f9fa;
}

.add-cat-btn {
  background: #D17862 !important;
  color: white !important;
}

.add-cat-btn:hover {
  background: #b8654a !important;
  transform: translateY(-2px);
}
/*  */
</style>