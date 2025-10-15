<script lang="ts">

</script>

<template>
<header>
  <img src="../public/photos/logo.png"/>
</header>
<section id="banner">
  <p>🐾 <strong>MEET OUR CATS:</strong> Adopt a furry friend today! 🐾</p>
</section>
<main>
  <section class="recipe-card">
    <img src="../public/photos/1.jpg"/>
    <div class="quickview">
      <h1>MiA</h1>
      <div class="details">
        <p>Age: 2</p>
        <p>Breed:</p>
        <p>cat personality</p>
      </div>
      <div class="actions">
        <button>
          View
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M6.046 11.677A7.5 7.5 0 0 1 20 15.5a1 1 0 1 0 2 0A9.5 9.5 0 0 0 4.78 9.963l-.537-3.045a1 1 0 1 0-1.97.347l1.042 5.909a1 1 0 0 0 .412.645a1.1 1.1 0 0 0 .975.125l5.68-1.001a1 1 0 1 0-.347-1.97z"/></g></svg>
      </div>
    </div>
  </section>
</main>
<footer>
  <p>&copy; 2025 Cat Rescue</p>
</footer>
</template>

<style scoped>



/* FOOTER STYLES */
footer {
  width:100%;
  background:#D17862;
  color:white;
  text-align:center;
  padding:10px;
  margin-top:auto;
}
/* ----------------- */



/* HEADER STYLES */
header{
  width:100%;
  background:#D17862;
  color:white;
  display:flex;
  align-items:center;
  padding:10px;
}
header img {
  height:50px;
}
/* ----------------- */


/* RECIPE CARD STYLES */
.recipe-card {
  width:100%;
  display:flex;
  flex-direction:column;
  border-radius:10px;
  box-shadow: 0 0 5px #ddd;
  padding:15px;
  text-align: center;
  border: #D17862 2px solid;
}
/* ----------------- */



/* RECIPE CARD QUICKVIEW STYLES */
.recipe-card .quickview{
  aspect-ratio: 1/1;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:20px;
}
.recipe-card .quickview h1{
  font-size:1.3rem;
}
.recipe-card .quickview .actions{
  display:flex;
  align-items:center;
  gap:5px;
  flex-grow:1;
}
.recipe-card .quickview .actions svg{
  cursor:pointer;
  transition: transform 0.2s;
}
.recipe-card .quickview .actions svg:hover{
  transform:scale(1.1);
}
/* ----------------- */



/* RECIPE CARD IMAGE STYLES */
.recipe-card img {
  aspect-ratio: 1/1;
  width:100%;
  border-radius:5px;
  cursor:pointer;
  opacity:0.9;
  transition: opacity 0.2s;
}
.recipe-card img:hover{
  opacity:1;
}
/* ----------------- */



/* BANNER STYLES */
#banner{
  width:100%;
  background:#ffe97b;
  padding:10px;
  text-align:center;
}
/* ----------------- */



/* BUTTON STYLES */
button{
  cursor:pointer;
  background: #D17862;
  color:white;
  font-weight:bold;
  border: 0;
  border-radius:5px;
  padding:5px 15px;
  font-size:1rem;
  transition: transform 0.2s;
  margin: 10px 0;
}
button:hover{
  transform:scale(1.05);
}
/* ----------------- */



/* RECIPE LIST STYLES */
main{
  padding:10px;
  display:grid;
  grid-template-columns: 1fr;
  gap:10px;
  background:white;
}

@media (min-width:414px){
  main{
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width:768px){
  main{
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width:1200px){
  main{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
/* ----------------- */

</style>