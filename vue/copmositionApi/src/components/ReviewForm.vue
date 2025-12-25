<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['review-submitted']);

  const review = reactive({
    name: '',
   content: '',
    rating: null,
    recommend: 'yes'
  })

  const onSubmit=()=>{
    if(!review.name === '' || !review.content === '' || review.rating === null || !review.recommend === ''){
      alert('Please fill out all fields before submitting your review.');
      return;
    }

     emit('review-submitted', {
    name: review.name,
    content: review.content,
    rating: review.rating,
    recommend: review.recommend,
  })
    review.name = '';
    review.content = '';
    review.rating = null;
    review.recommend = 'yes';
  }
</script>
<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="review.name" />

    <label for="review">Review:</label>
    <textarea id="review" v-model="review.content"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="review.rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
    <label>Would you recommend this product?</label>
    <label>
      <input type="radio" value="yes" v-model="review.recommend"  /> Yes
    </label>
    <label>
      <input type="radio" value="no" v-model="review.recommend"/> No
    </label>

    <input class="button" type="submit" value="Submit" />
  </form>
</template>