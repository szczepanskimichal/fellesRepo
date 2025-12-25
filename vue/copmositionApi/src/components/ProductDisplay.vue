<script setup>
import { ref, computed } from 'vue';
  import socksGreenImage from '@/assets/images/socks_green.jpeg';
  import socksBlueImage from '@/assets/images/socks_blue.jpeg';
  
  const brand = ref('Mastery Vue');
  const product = ref("Socks");
  const description = ref('this is a product description')+
   ('loren ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.');
  const selectedVariant = ref(0);
  // const inventory = ref(15);
  const onSale = ref(true);
  const url = ref('https://www.linkedin.com/in/michal-szczepansky');
  const details = ref(['50% cotton', '30% wool', '20% polyester']);
  const variants = ref([
    { id: 12312, color: 'green', image: socksGreenImage, quantity: 50 },
    { id: 2232, color: 'blue', image: socksBlueImage, quantity: 0 },
  ]);
  const sizes = ref(['S', 'M', 'L', 'XL']);
  const addToCart = () => {
    cart.value++;
  }
  const removeFromCart =()=>{
    if(cart.value >=1){
      cart.value--;
    }
  }
  const updateVariant = (index) => {
    selectedVariant.value = index;
    // console.log(index);
  }
  const image = computed(() => {
    return variants.value[selectedVariant.value].image;
  });
  const inStock = computed(() => {
    return variants.value[selectedVariant.value].quantity >0;

  });
  // const title = ref('Vue Socks');
  const title = computed(()=>{
    return brand.value + ' ' + product.value;
  })
  const currentQuantity = computed(()=>{
    return variants.value[selectedVariant.value].quantity;
  });
</script>
<template>
<div class="product-displaty">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image" alt="Product Image" :class="{'out-of-stock-img': !inStock}" />
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <!-- <h1>{{ brand + ' ' + product }}</h1> -->
        <p v-if="currentQuantity > 10">In stock</p>
        <p v-else-if="currentQuantity <= 10 && currentQuantity > 0">Almost sold out!!!</p>
        <p v-else>Out of stock</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <ul>
          <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
        </ul>
        <div v-for="(variant, index) in variants" 
        :key="variant.id"
        @mouseover="updateVariant(index)"
        class="color-circle"
        :style="{ backgroundColor: variant.color }"
        >{{ variant.color }}</div>
        <p>{{ description }}</p>
        <p v-if="onSale">On Sale!</p>
        <button 
        class="button" 
        v-on:click="addToCart"
        :disabled="!inStock"
        :class="{disabledButton: !inStock}"
        >Add to cart</button>
        <button class="button" @:click="removeFromCart">Remove</button>
      </div>
    </div>
  </div>
</template>